from flask import Flask, request
from flask_restful import Api,Resource,abort
from flask_cors import CORS, cross_origin
import pymongo
from pymongo import MongoClient
import certifi
import json

# pymango
ca = certifi.where()
#cluster = MongoClient("mongodb+srv://Attakorn:1234@cluster0.xqwet.mongodb.net/table?retryWrites=true&w=majority", tlsCAFile = ca)
cluster = MongoClient("mongodb+srv://pleum:1234@cluster0.vyv4b.mongodb.net/test?retryWrites=true&w=majority", tlsCAFile = ca)
db = cluster['test']
collection = db['test']
data = collection.find({})
cell = {}


app = Flask(__name__)
api = Api(app)
cors = CORS(app)

#function

@cross_origin()
@app.route('/getcelldata/', methods=['POST'])
def getData():
    error = None
    if request.method == 'POST':        
        if request.json['cellid'] not in cell.keys():
            cell[request.json['cellid']] = request.json['cellvalue']
        elif request.json['cellid'] in cell.keys():
            cell[request.json['cellid']] = request.json['cellvalue']
        return '200 OK'

@app.route('/celldetail/', methods=['GET'])
def detail():
    error = None
    if request.method == 'GET':
        return cell

@app.route('/save/', methods=['POST'])
def save():
    error = None
    if request.method == 'POST':
        for i in cell.keys():
            if collection.find_one({'_id' : i}):
                collection.update_one({'_id': i}, { "$set": {'cellid' : i,  'cellvalue' : cell[i]} })
            else:
                collection.insert_one({'_id': i, 'cellid' : i,  'cellvalue' : cell[i]})
    return '200 OK'

@app.route('/demoload/', methods=['GET'])
def demoload():
    error = None
    loaddata = []
    loaddata2 = [] 
    row = 0   
    if request.method == 'GET':
        data = collection.find({})        
        for i in data:            
            if (int(i['cellid'].split(',')[0]) != row):
                row = row + 1
                loaddata.append(loaddata2)
                loaddata2 = []
                loaddata2.append(i['cellvalue'])
                continue
            loaddata2.append(i['cellvalue'])
        loaddata.append(loaddata2)      
            
        return json.dumps(loaddata)

@app.route('/load/', methods=['POST'])
def load():
    error = None
    loaddata = []
    loaddata2 = [] 
    row = 0
    if request.method == 'POST':
        data = collection.find({})        
        for i in data:
            if (int(i['cellid'].split(',')[0]) != row):
                row = row + 1
                loaddata.append(loaddata2)
                loaddata2 = []
                loaddata2.append(i['cellvalue'])
                continue
            loaddata2.append(i['cellvalue'])
        loaddata.append(loaddata2)
              
        return json.dumps(loaddata)


if __name__ == '__main__':
    app.run(debug=True)