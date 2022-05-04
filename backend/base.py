from flask import Flask
import requests
import os
from dotenv import load_dotenv
api = Flask(__name__)

@api.route('/')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript",
        "README" : "THIS IS THE BACK END ROUTE"
    }

    return response_body


#retrieve opinions by title id
#each title result should produce a button that corresponds to this tid search
@api.route("/pythonapi/<tid>")
def opinionson(tid):
    url = 'https://imdb-api.com/en/API/Reviews/k_wz4q71x5/' + tid;
    load_dotenv()
    imdb_apikey = os.environ.get('imdb_apikey')
    ibm_apiurl = os.environ.get('ibm_apiurl')
    ibm_apikey = os.environ.get('ibm_apikey')
    imdb_resp = requests.get(url).json()
    movie_title = imdb_resp['title'] #for twitter searching; implement later
    movie_fulltitle = imdb_resp['fullTitle'] #with year
    imdb_reviews = [rev['title'] + rev['content'] for rev in imdb_resp['items']]
    # print(ibm_apiurl)
    ibm_imdb_responses = []

    for r in imdb_reviews:
        ibm_imdb_responses += [requests.post(str(ibm_apiurl) + '/v1/analyze?version=2022-05-03', json={'text': r, 'features': {'emotion': {}, 'sentiment': {}}}, auth=('apikey',ibm_apikey)).json()]

    pos_ratio = sum(label == 'positive' for label in [r['sentiment']['document']['label'] for r in ibm_imdb_responses]) / len(ibm_imdb_responses)
    pos_avg_score = sum(r['sentiment']['document']['score'] for r in ibm_imdb_responses if r['sentiment']['document']['label'] == 'positive') / (pos_ratio * len(ibm_imdb_responses))
    vals = {
            'pos_ratio' : pos_ratio,
            'pos_avg_score' : pos_avg_score
            }

    return vals