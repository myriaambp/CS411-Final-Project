from flask import Flask

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
    imdb_resp = requests.get('https://imdb-api.com/en/API/Reviews/k_wz4q71x5/' + tid).json()
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