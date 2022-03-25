from unittest import result
from flask import Flask
from flask_restful import Api,Resource,abort
import pymongo
from pymongo import MongoClient
import certifi

# pymango
ca = certifi.where()
cluster = MongoClient("mongodb+srv://Attakorn:1234@cluster0.xqwet.mongodb.net/table?retryWrites=true&w=majority", tlsCAFile = ca)
db = cluster['table']
collection = db['test1']
results = collection.find({})
mycity = {}
for i in results:
    mycity[i['_id']] = i

app = Flask(__name__)
api = Api(app)

#validate
def notFoundCity(city_id):
    if city_id not in mycity:
        abort(404,message='Not Found')
#design
class WeatherCity(Resource):
    def get(self, city_id):
        notFoundCity(city_id)
        return mycity[city_id]
    def post(self, name):
        return {'data':'Create Resource = '+name}

#call
api.add_resource(WeatherCity, '/weather/<int:city_id>')

if __name__ == '__main__':
    app.run(debug=True)