from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import json
import os

app = Flask(__name__)
CORS(app)
load_dotenv()
imdb_apikey = os.environ.get('imdb_apikey')

@app.route("/search_title/<query>")
def imdb_titlesearch(query):
    return requests.get('https://imdb-api.com/en/API/Search/' + imdb_apikey + '/' + query).json()
