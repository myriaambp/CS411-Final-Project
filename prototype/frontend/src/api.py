# --------- RESOURCES: -------------
# https://www.educative.io/edpresso/how-to-make-api-calls-in-python
# API_KEY = k_wz4q71x5
import requests
import json
import pandas as pd
import flask 
from flask_classful import FlaskView, route
from flask import Flask, jsonify, request

@app.route('/api')
class API(FlaskView):
    route_base = '/api'
    def post(self):
        if (request.headers['Content-Type'] == 'application/json'):
            word = request.get_json()
            print(word)


class MakeApiCall:

    def get_data(self, api):
        response = requests.get("https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/endgame")
        if response.status_code == 200:
            print("sucessfully fetched the data")
            self.formatted_print(response.json())
        else:
            print("Hello person, there's a " + str(response.status_code) + " error with your request")

    def get_user_data(self, api, parameters):
        response = requests.get("https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/endgame", params=parameters)
        if response.status_code == 200:
            print("sucessfully fetched the data with parameters provided")
            self.formatted_print(response.json())
        else:
            print("Hello person, there's a " + str(response.status_code) + " error with your request")

    def formatted_print(self, obj):
        text = json.dumps(obj, sort_keys=True, indent=4)
        print(text)

    def __init__(self, api = "https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/endgame"):
        self.get_data( "https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/endgame")
        # api = process(api)
        # parameters = {
        #     "username": "kedark"
        # }
        # self.get_user_data(api, parameters)


print("BEGIN API CALL")
api_call = MakeApiCall("https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/endgame")
print("END API CALL")

def display_results():
    if(requests.is_ajax()):
        msg = request.POST.get("message")
        if(msg == "display-results"):
            api_call = MakeApiCall("https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/endgame")
            return HttpResponse(json.dumps(api_Call), mimetype = 'application/json')



# display_results()
# def add_numbers():
#     a = request.args.get('a', 0, type=int)
#     b = request.args.get('b', 0, type=int)
#     return jsonify(result=a + b)

# @app.route('/')
# def index():
#     return render_template('index.html')