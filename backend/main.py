from unittest import result
from flask import Flask
from flask_restful import Api,Resource,abort
from flask_cors import CORS, cross_origin
import pymongo
from pymongo import MongoClient
import certifi

# pymango
ca = certifi.where()
#cluster = MongoClient("mongodb+srv://Attakorn:1234@cluster0.xqwet.mongodb.net/table?retryWrites=true&w=majority", tlsCAFile = ca)
cluster = MongoClient("mongodb+srv://pleum:1234@cluster0.vyv4b.mongodb.net/test?retryWrites=true&w=majority", tlsCAFile = ca)
db = cluster['test']
collection = db['test']
results = collection.find({})
mycity = {}
for i in results:
    mycity[i['_id']] = i

app = Flask(__name__)
api = Api(app)
cors = CORS(app)


#validate
def notFoundCity(city_id):
    if city_id not in mycity:
        abort(404,message='Not Found')

@cross_origin()
#design
class WeatherCity(Resource):
    def get(self, city_id):
        notFoundCity(city_id)
        return mycity[city_id]
    def post(self, name):
        return {'data':'Create Resource = '+name}
class allWeatherCity(Resource):
    def get(self):
        return mycity
#call
#api.add_resource(WeatherCity, '/weather/<int:city_id>')
api.add_resource(allWeatherCity, '/weather/')

if __name__ == '__main__':
    app.run(debug=True)