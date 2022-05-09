from flask import Flask
import requests
import pandas as pd
import numpy as np
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
    imdb_resp = requests.get(url).json()
    title = imdb_resp["title"]
    mid = imdb_resp["imDbId"]
    year = imdb_resp["year"]
    reviews = imdb_resp["items"]
    movies = pd.read_csv("../datasets/movies.csv")
    rev_ds = pd.read_csv("../datasets/reviews.csv")
    movies.columns = ["title", "id", "year", "avg_rate"]
    rev_ds.columns = ["movie_id", "rate", "title", "review", "date", "spoilers"]
    if (mid not in movies.title):
        for r in reviews:
            rev_ds.insert(mid, r["rate"], r["title"], r["content"], r["date"], r["warningSpoilers"])
        thismov_rev_ds = rev_ds[["movie_id" == mid]]
        rate_avg = thismov_rev_ds["rate"].mean()
        movies = movies.insert ([title, mid, year, rate_avg])
    else:
        thismov_rev_ds = reviews[["movie_id" == mid]]
        rate_avg = thismov_rev_ds["rate"].mean()
    return rate_avg


        


