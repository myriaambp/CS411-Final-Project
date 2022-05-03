from flask import Flask, render_template, jsonify
import test

app = Flask(__name__)

@app.route('/index')
def json():
    return render_template('json.html')

@app.route('/imdb_search')
def imdb_search():
    response = requests.get("https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/endgame")
    if response.status_code == 200:
        jsonobj = HttpResponse(json.dumps(response.json(), sort_keys=True, indent=4))
        return jsonobj
    else:
        response_body = {
            "name": "Nagato",
            "about" :"Hello! I'm a full stack developer that loves python and javascript"
        } 
    return response_body
