from flask import Flask, request, abort, jsonify, session, Response
from flask_cors import CORS
from flask import render_template
from config import ApplicationConfig
from models import db

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

CORS(app, supports_credentials=True)
db.init_app(app)

@app.route('/', methods=['GET'])
def index():
    return "this is an index page \n"

@app.route('/auth', methods=['POST'])
def startStreamBroadcast():
    streamkey = request.form['name']
    
    if( streamkey != 'key'):
        return Response(status=401)

    return Response(status=200)
    


if __name__ == "__main__":
    app.run(debug=True)