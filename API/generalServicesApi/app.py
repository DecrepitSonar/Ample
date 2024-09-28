import os
from flask import Flask, request, abort, jsonify, session, make_response, redirect

from flask_bcrypt import Bcrypt
from models import db, User
from config import ApplicationConfig
from flask_session import Session 
from flask_cors import CORS
from flask import render_template
from contentDb import contentDb

import uuid

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

CORS(app, supports_credentials=True)

server_session = Session(app)
bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# Auth
@app.route('/whoami', methods=['GET'])
def getCurrentUser():

    if not len(request.cookies): 
        return jsonify({'error':'unauthorized'}), 401
    
    token = str(request.cookies['xrftoken'])
    
    user = User.query.filter_by(id=token).first()

    userSession = session.get(request.id)

    print( userSession = session.get('user_id') )

    if not user: 
        return jsonify({ "error": "unauthorized user "}, 401)
    
    if userSession == None: 
        return jsonify({ "error": "unauthorized user "}, 401)

    # print(user)

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "imageURL": user.imageURL,
        "headerPosterURL": user.headerPosterURL,
        "type": user.type
    }), 200

@app.route('/register', methods=['POST'])
def register_user():
    email = request.json['email']
    password = request.json['password']

    if User.query.filter_by(email=email).first() is not None:
        response = jsonify({
            'error': {
            'message': "User already exists " ,
            'Code': 'EMAIlLERR'}
        })
        return response

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()

    sessionId = uuid.uuid4()
    session[sessionId] = new_user.id

    print(sessionId)

    result = jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "imageURL": new_user.imageURL,
        "headerPosterURL": new_user.headerPosterURL,
        "type": new_user.type
    }),200

    response = make_response(result)
    response.set_cookie("xrftoken", new_user.id, httponly=True, secure=True, samesite='None')
    return response 

@app.route('/login', methods=['POST'])
def login_user():

    print(request.json)
    print( request.headers['User-Agent'] )
    user = {}

    if( request.headers['User-Agent'] == 'Ample/1 CFNetwork/1568.100.1 Darwin/24.0.0'):
        user = User.query.filter_by(username=request.json['username']).first()
    else:
        user = User.query.filter_by(email=request.json['email']).first()

    print( user )
    password = request.json['password']
    
    if user is None:
        print("user not found")
        return jsonify({'error': {
            "message": "Unauthorized",
            "errorCode": ""
            }}), 401
    
    print("Found User:", user.password)

    if not bcrypt.check_password_hash(user.password, password):
        print("failed")
        return jsonify({"error": "Unauthorized"}), 401
    else:
        sessionId = uuid.uuid4()
        session[sessionId] = user.id

        result =  jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "imageURL": user.imageURL,
            "headerPosterURL": user.headerPosterURL,
            "type": user.type
        })

        response = make_response(result)
        response.set_cookie("xrftoken", user.id, httponly=True, secure=True, samesite='None')
        return response
    # return jsonify({}), 200
   
@app.route('/user', methods=['GET'])
def getUser():
    userId = request.args['id']
    print( userId )

    user = User.query.filter_by(id=userId).first()
    
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "imageURL": user.imageURL,
        "headerPosterURL": user.headerPosterURL,
        "type": user.type
    }), 200


@app.route('/updateSettings', methods=['PUT'])
def updateUserSettings(): 

    file = request.files['imageURL']

    if( file.filename == ''):
        return redirect( request.url)
    else:
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

    requestObject = {} 
    for key in request.form.keys():
        requestObject[key] = request.form[key]

    print( requestObject)

    user = User.query.filter_by(username=requestObject['username']).first()

    if(user):
        print( user )
        return jsonify({'error': 'Username not available'}),200

    User.updateUserData( requestObject )

    return jsonify({}), 200

@app.route('/logout', methods=['POST'])
def logout():
    print( "logging out ")
    user_id =  request.args['id']

    # user =  session['user_id'] 
    print( session.get('user_id') )

    return jsonify({"status": "success"}), 200


# Content

@app.route('/', methods=['GET'])
def home():

    content = {
        'featured': [],
        'podcasts': [],
        'music': [],
        'artists': []
    }

    featuredVideos = contentDb['featuredvideos'].find({'type': 'Featured Video'},
                                                      {
                                                          "_id": 0, 
                                                          "id": 1, 
                                                          "title": 1, 
                                                          "artist": 1, 
                                                          'videoURL':1})
    
    for item in list(featuredVideos):

        content['featured'].append(
            {
                'id': item['id'],
                'title': item['title'],
                'author': item['artist'],
                'contentURL': item['videoURL']
            }
        )

    podcastVideos = contentDb['videos'].find({'type': 'podcast'},
                                            {
                                                "_id": 0, 
                                                "id": 1, 
                                                "title": 1, 
                                                'artistImageURL': 1, 
                                                "posterURL": 1, 
                                                "artist": 1 })
    
    for item in list(podcastVideos):

        print( item, '\n' )
        content['podcasts'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['artist'],
            'imageURL': item['artistImageURL'],
            'posterURL': item['posterURL']
        })
    
    music = contentDb['albums'].find({},{
        "_id":0,
        'title': 1, 
        'name': 1,
        'imageURL': 1
    }).limit(5)


    for item in list(music): 
        print( item)

        content['music'].append({
            'title': item['title'],
            'author': item['name'],
            'imageURL': item['imageURL']
        })

    artists = contentDb['artists'].find({},{
        '_id': 0,
        'id': 1,
        'name': 1,
        'imageURL': 1
    }).limit(6)

    for item in list(artists):
        content['artists'].append({
            'id': item['id'],
            'username': item['name'],
            'imageURL': item['imageURL']
        })

    print( list(artists))

    return jsonify( content)

@app.route('/watch', methods=['GET'])
@app.route('/listen', methods=['GET'])
@app.route('/browse', methods=['GET'])

# Dashboard 
@app.route('/dashboard', methods=['GET'])
def dash():
    return render_template('home.html')

@app.route('/dashboard/login', methods=['GET'])
def dashLogin():
    return render_template('login.html')

@app.route('/dashboard/signup', methods=['GET', 'POST'])
def dashSignUp():
    # user = jsonify({
    #     'username': request.json['username'],
    #     'email': request.json['email'],
    #     'password': request.json['password'],
    #     'city': request.json['city'],
    #     'type': request.json['type']
    # })
    # print( user)
    print(request.headers)
    return render_template('signup.html')

if __name__ == "__main__":
    app.run(debug=True)