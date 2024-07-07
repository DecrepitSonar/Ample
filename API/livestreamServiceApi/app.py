from flask import Flask, request, abort, jsonify, session
from flask_cors import CORS
from flask import render_template

app = Flask(__name__)

CORS(app, supports_credentials=True)

@app.route('/', methods=['GET'])
def index():
    return "this is an index page \n"

app.route('/onair', methods=["POST"])
def startStreamBroadcast():
    streamkey = "key"

    print(request)

    return

if __name__ == "__main__":
    app.run(debug=True)