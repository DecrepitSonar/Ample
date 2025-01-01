from flask import Flask, request, abort, jsonify, session, Response
from flask import Blueprint

live = Blueprint('live', __name__, url_prefix='/live')

@live.route('/', methods=['GET'])
def index():
    return "this is an index page \n"

@live.route('/auth', methods=['POST'])
def startStreamBroadcast():
    streamkey = request.form['name']
    
    if( streamkey != 'key'):
        return Response(status=401)

    return Response(status=200)