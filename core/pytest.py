import requests
import pandas as pd
import numpy as np


# -----------------------------------



url = 'https://imdb-api.com/en/API/Reviews/k_wz4q71x5/' + tid;
imdb_resp = requests.get(url).json()
title = imdb_resp["title"]
mid = imdb_resp["imDbId"]
year = imdb_resp["year"]
reviews = imdb_resp["items"]
movies = pd.read_csv("../datasets/movies.csv")
movies = pd.read_csv("../datasets/reviews.csv")
movies.columns = ["title", "id", "year", "avg_rate"]
reviews.columns = ["movie_id", "id", "year"]
reviews.columns = ["movie_id", "rate", "title", "review", "spoilers"]
for r in reviews:
    reviews = imdb_resp["items"]


if (mid not in movies.title):
    rate_avg = reviews["rate"].mean()
    movies = movies.append([title, mid, year], rate_avg)