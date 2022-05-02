from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from dotenv import load_dotenv
import requests
import json
import os

app = Flask(__name__)
CORS(app)
load_dotenv()
imdb_apikey = os.environ.get('imdb_apikey')
ibm_apiurl = os.environ.get('ibm_apiurl')
ibm_apikey = os.environ.get('ibm_apikey')
db_name = 'Sqlite3.db'

@app.route("/search_title/<query>")
def imdb_titlesearch(query):
    return requests.get('https://imdb-api.com/en/API/Search/' + imdb_apikey + '/' + query).json()

#retrieve opinions by title id
#each title result should produce a button that corresponds to this tid search
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
    pos_avg_score = sum(r['sentiment']['document']['score'] for r in ibm_imdb_responses if r['sentiment']['document']['label'] == 'positive') / (pos_ratio * len(ibm_imdb_responses))
    vals = {
            'pos_ratio' : pos_ratio,
            'pos_avg_score' : pos_avg_score
            }

    return vals
