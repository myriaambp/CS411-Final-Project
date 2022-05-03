from flask import Flask
from flask import request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from sqlalchemy.sql import text
from dotenv import load_dotenv
import requests
import json
import os

app = Flask(__name__)
auth = HTTPBasicAuth()
cors = CORS(app, resources={r"/*": {"origins": "*"}}, headers='Content-Type')
load_dotenv()
imdb_apikey = os.environ.get('imdb_apikey')
ibm_apiurl = os.environ.get('ibm_apiurl')
ibm_apikey = os.environ.get('ibm_apikey')
db_name = 'users.db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    googleid = db.Column(db.String)
    token = db.Column(db.String)
    last_searched = db.Column(db.String)

    def __init__(self, name, googleid, token, last_searched):
        self.name = name
        self.googleid = googleid
        self.token = token
        self.last_searched = last_searched

db.create_all()

@auth.verify_password
def verify_password(i, t):
    u = User.query.filter_by(googleid=i).first()
    if u.token == t:
        return i

@app.route("/search_title/<query>")
@auth.login_required
def imdb_titlesearch(query):
    u = User.query.filter_by(googleid=auth.current_user()).first()
    u.last_searched = query
    db.session.commit()
    return requests.get('https://imdb-api.com/en/API/SearchMovie/' + imdb_apikey + '/' + query).json()

# retrieve opinions by title id
# each title result obtained above should produce a button that corresponds to this tid search
@app.route("/titleid_reviews/<tid>")
def opinionson(tid):
    imdb_resp = requests.get('https://imdb-api.com/en/API/Reviews/' + imdb_apikey + '/' + tid).json()
    movie_title = imdb_resp['title'] #for twitter searching; implement later
    movie_fulltitle = imdb_resp['fullTitle'] #with year
    imdb_reviews = [rev['title'] + rev['content'] for rev in imdb_resp['items']]

    ibm_imdb_responses = []

    for r in imdb_reviews:
        ibm_imdb_responses += [requests.post(ibm_apiurl + '/v1/analyze?version=2022-04-07', json={'text': r, 'features': {'emotion': {}, 'sentiment': {}}}, auth=('apikey',ibm_apikey)).json()]

    pos_ratio = sum(label == 'positive' for label in [r['sentiment']['document']['label'] for r in ibm_imdb_responses]) / len(ibm_imdb_responses)
    # not too sure about how the scoring works but I imagine it's a measure of how positive the text is
    # in that case these should provide an estimate of how extreme opinions are on the film
    pos_avg_score = sum(r['sentiment']['document']['score'] for r in ibm_imdb_responses if r['sentiment']['document']['label'] == 'positive') / (pos_ratio * len(ibm_imdb_responses))
    neg_avg_score = sum(r['sentiment']['document']['score'] for r in ibm_imdb_responses if r['sentiment']['document']['label'] == 'negative') / ((1 - pos_ratio) * len(ibm_imdb_responses))
    vals = {
            'pos_ratio' : pos_ratio,
            'pos_avg_score' : pos_avg_score,
            'neg_avg_score' : neg_avg_score
            }

    return vals

# frontend should post w/ payload containing resp from google
@app.route("/login/",methods=['POST'])
def login():
    resp = request.get_json()
    u = User.query.filter_by(googleid=resp['googleId']).first()
    if u is None: 
        new_user = User(resp['profileObj']['name'], resp['googleId'], resp['accessToken'], '')
        db.session.add(new_user)
    else:
        u.token = resp['accessToken']
    db.session.commit()
    return {
            'name': u.name,
            'googleId': u.googleid,
            'token': u.token,
            'last_searched': u.last_searched
            }
