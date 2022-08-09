from flask import Flask, request, abort
from ratelimit import limits
import os, requests
app = Flask('app')

URL = 'https://api.openweathermap.org/data/2.5/weather?'
secret = os.environ['API_TOKEN']

@app.route('/data')
@limits(calls=25, period=1)
def get_data():
  latitude = request.args.get('LAT')
  longitude = request.args.get('LON')
  if None in (latitude, longitude):
    abort(403)
  response = requests.request("GET", URL+f'lat={latitude}&lon={longitude}&appid={secret}')
  data = response.json()
  return data

@app.route('/')
def desc():
  return 'Hello! Use our Chrome Extension to access Weather Data.'

app.run(host='0.0.0.0', port=8080)