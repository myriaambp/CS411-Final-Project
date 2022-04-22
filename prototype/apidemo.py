import requests
import json

apikey = 'k_o4sbpbiy'

def imdb_search(query):
    return requests.get('https://imdb-api.com/en/API/Search/' + apikey + '/' + query).json()

q = input('what movie or TV show would you like to search for? ')
resp = imdb_search(q)
for entry in resp['results']:
    print('https://www.imdb.com/title/' + entry['id'] + '\t' + entry['title'] + ' ' + entry['description'])
