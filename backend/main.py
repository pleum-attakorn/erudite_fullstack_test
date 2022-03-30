from flask import Flask, request
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
data = collection.find({})
cell = {}
loaddata = {}
# count = 0
# for i in data:
#     dic = {}
#     dic['cellid'] = i['cellid']
#     dic['cellvalue'] = i['cellvalue']
#     loaddata[count] = dic
#     count = count + 1
# print(loaddata)

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
        # return 'post'

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
            collection.update_one({'_id': i}, { "$set": {'cellid' : i,  'cellvalue' : cell[i]} })
    # return cell

@app.route('/load/', methods=['GET'])
def load():
    error = None     
    if request.method == 'GET':
        data = collection.find({})
        count = 0
        for i in data:
            dic = {}
            dic['cellid'] = i['cellid']
            dic['cellvalue'] = i['cellvalue']
            loaddata[count] = dic
            count = count + 1
        return loaddata

if __name__ == '__main__':
    app.run(debug=True)