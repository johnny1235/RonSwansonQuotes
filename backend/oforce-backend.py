from flask import Flask, render_template, jsonify, Response, flash, request
from flask_bootstrap import Bootstrap
from flask_cors import CORS
from boto3.dynamodb.conditions import Key
import requests, ast, re
import os
import boto3
import socket

app = Flask(__name__)
CORS(app)


boto3.setup_default_session(region_name='us-east-1')

# Password put into config file to read from for Security ******
password = open('pass.txt','r').read().split('\n')
ddb_resource = boto3.resource(
   "dynamodb",
   aws_access_key_id=password[0],
   aws_secret_access_key=password[1]
)

#function used to generate array of 61 quotes from Ron Swanson API
def randomQuotes():
  response = requests.get("http://ron-swanson-quotes.herokuapp.com/v2/quotes/61")
  listOfQuotes = ast.literal_eval(response.text)
  #listOfQuotes = listOfQuotes[1:-1]
  return(listOfQuotes)

#Testing
@app.route('/')
def hello_world():
    return("Hello There")

## Post Rating in DynamoDB
@app.route('/rating/submit', methods=['POST'])
def ratingSubmit():
    #Get Parameters from front end
    content = request.json
    visitor=content["visitor"]
    quote=content["quote"]
    rate=content["rate"]

    #connect to DyanamoDB table
    table = ddb_resource.Table("kevin-oforce-quotes")
    #Query table to check if visitor voted on this quote before
    response = table.query(
    KeyConditionExpression=Key('Quotes').eq(quote) & Key('IP').eq(visitor)
)
    data = response['Items'] 

    ## Check DB and add new item 
    if(len(data) == 0):
        response = table.put_item(
        Item=
        {
          'Quotes': quote,
          'IP': visitor,
          'rating': rate
        }
        )
        return("True")
    else:
      return("False")


## Get Avg Rating in DynamoDB
@app.route('/rating/avg', methods=['POST'])
def ratingAvg():
    #Get Parameters from front end
    content = request.json
    quote=content["quote"]

    #connect to DyanamoDB table
    table = ddb_resource.Table("kevin-oforce-quotes")

    #query table for items that match column Quotes == quotes (from param)
    response = table.query(
    KeyConditionExpression=Key('Quotes').eq(quote)
)   
    #data = array of items in table that match my query
    data = response['Items']

    # Logic to add all rating from Data and divide by length of Data array
    # Sum of arrays / Number of voters = Avg Rating
    avg = 0
    if(len(data) > 0):
        for eachData in data:
            avg+=(eachData['rating'])
        avg = avg/len(data)
    return(str(avg))

## Display small quote
@app.route('/quotes/small', methods=['GET'])
def small():
    #generate big list of random quotes
    listOfQuotes = randomQuotes()

    #filter array that match small quotes description
    for quotes in listOfQuotes:
      res = re.findall(r'\w+', quotes) 
      if(len(res) < 5):
          return(quotes)
    
## Display medium quote
@app.route('/quotes/medium', methods=['GET'])
def medium():
    #generate big list of random quotes
    listOfQuotes = randomQuotes()

    #filter array that match medium quotes description
    for quotes in listOfQuotes:
      res = re.findall(r'\w+', quotes) 
      if(len(res) > 4 and len(res) < 13):
          return(quotes)

## Display Big quote
@app.route('/quotes/big', methods=['GET'])
def big():
    #generate big list of random quotes
    listOfQuotes = randomQuotes()

    #filter array that match big quotes description
    for quotes in listOfQuotes:
      res = re.findall(r'\w+', quotes) 
      if(len(res) > 12):
          return(quotes)

if __name__ == '__main__':
   app.run(app.run(debug=True, host='0.0.0.0'))