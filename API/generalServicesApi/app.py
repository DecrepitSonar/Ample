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
    
    sessionId = request.cookies['xrftoken']
    id = session[sessionId]
    print( "User Id: ", id)

    print( id)

    if id == None: 
        return jsonify({ "error": "unauthorized user "}, 401)

    user = User.query.filter_by(id=id).first()

    if not user: 
        return jsonify({ "error": "unauthorized user "}, 401)

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

@app.route('/login', methods=['POST', 'GET'])
def login_user():

    if request.method == 'POST':
            
        if( request.headers['User-Agent'] == 'Ample/1 CFNetwork/1568.100.1 Darwin/24.0.0'):
            user = User.query.filter_by(username=request.json['username']).first()

        else:
            user = User.query.filter_by(email=request.json['email']).first()

        password = request.json['password']
        print( password )
        
        if user is None:
            print("user not found")
            return jsonify({'error': {
                "message": "Unauthorized",
                "errorCode": ""
                }}), 401
        
        print("Found User:", user.password)
        print( bcrypt.check_password_hash(user.password, password) )

        if bcrypt.check_password_hash(user.password, password):

            print( "success")
            sessionId = str(uuid.uuid4())
            print( "Session Id:", sessionId)

            session['session'] = user.id
            print("session id stored as:" ,session['session'])

            result = jsonify({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "imageURL": user.imageURL,
                "headerPosterURL": user.headerPosterURL,
                "type": user.type
            })

            response = make_response(result)
            response.set_cookie("xrftoken", sessionId, httponly=True, secure=True, samesite='None')
            
        else:

            print("failed")
            response = jsonify({"error": "Unauthorized"}), 401
    
    else:
        print('validating user')
        if not len(request.cookies): 
             return  jsonify({'error':'unauthorized'}), 401
    
        sessionId = request.cookies['xrftoken']

        id = session['session']
        print( "User Id: ", id)

        # print( id)

        # if id == None: 
            # return jsonify({ "error": "unauthorized user "}, 401)

        # user = User.query.filter_by(id=id).first()

        # if not user: 
            # return jsonify({ "error": "unauthorized user "}, 401)

        # response = jsonify({
        #     "id": user.id,
        #     "username": user.username,
        #     "email": user.email,
        #     "imageURL": user.imageURL,
        #     "headerPosterURL": user.headerPosterURL,
        #     "type": user.type
        # }), 200
        response = 200

    return response 
      
   
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
        'artists': [],
        'videos': []
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
        content['podcasts'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['artist'],
            'imageURL': item['artistImageURL'],
            'posterURL': item['posterURL']
        })
    
    music = contentDb['albums'].find({},{
        "_id":0,
        'id': 1,
        'title': 1, 
        'name': 1,
        'imageURL': 1
    }).limit(5)


    for item in list(music): 
        content['music'].append({
            'id': item['id'],
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

    for item in list(contentDb['videos'].find({'type': 'music'},
                                              {
                                                '_id': 0,
                                                'id': 1,
                                                'title': 1,
                                                'artistImageURL': 1,
                                                'imageURL': 1,
                                                'views': 1,
                                                'artist': 1}).limit(3)): 
        
        content['videos'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['artist'],
            'imageURL': item['artistImageURL'],
            'posterURL': item['imageURL']
        })

    return jsonify( content)

@app.route('/playlist', methods=['GET'])
def getPlaylist():
    playlistId =  request.args['id']

    content = {
            'head': {
                'playlist': {},
                'tracks': [],
                'author': {}
            },
            'albums': [],
            'features': []
        }

    playlist = contentDb['albums'].find_one({'id': playlistId},
                                                {'_id': 0,
                                                 'id': 1,
                                                'title': 1,
                                                'name': 1,
                                                'imageURL': 1,
                                                'artistId': 1})
    
    author = contentDb['artists'].find_one({'id': playlist['artistId']},
                                           {
                                               '_id': 0,
                                               'id': 1,
                                               'imageURL': 1,
                                               'name': 1
                                           })
    
    content['features'].append({
        'id': author['id'],
        'username': author['name'],
        'imageURL': author['imageURL']
    })

    tracks = contentDb['tracks'].find({'albumId': playlist['id']},
                                      {
                                          '_id': 0,
                                          'id': 1,
                                          'title': 1,
                                          'name': 1,
                                          'audioURL': 1,
                                          'artistId': 1,
                                          'imageURL': 1,
                                      }).sort('trackNum')
    

    content['head']['playlist'] = {
        'id': playlist['id'],
        'title': playlist['title'],
        'author': playlist['name'],
        'imageURL': playlist['imageURL'],
        'artistId': playlist['artistId'],
        # 'audioURL': playlist['audioURL']
    } 

    content['head']['author'] = {
        'id': author['id'],
        'imageURL': author['imageURL'],
        'username': author['name']
    }

    for item in list(tracks): 
        content['head']['tracks'].append(item)

    albums = contentDb['albums'].find({'artistId': author['id']},
                                      {
                                          '_id': 0,
                                          'id': 1,
                                          'title': 1,
                                          'imageURL': 1,
                                          'name': 1
                                      })
    
    for item in albums: 
        content['albums'].append({
            'id': item['id'],
            'title': item['title'],
            'imageURL': item['imageURL'],
            'author': item['name']
        })

    return jsonify(content)

@app.route('/watch', methods=['GET'])

@app.route('/video', methods=['GET'])
def getVideo():
    videoId = request.args['videoId']
    
    video = contentDb['videos'].find_one({'id': videoId}, {'_id': 0,
                                                           'id': 1,
                                                           'title': 1,
                                                            'artistImageURL': 1,
                                                            'imageURL': 1,
                                                            'views': 1,
                                                            'artist': 1,
                                                            'videoURL': 1,
                                                            'artistId': 1})
    
    recommendedVideos = list(contentDb['vidoes'].find({'artistId': video['artistId']}))

    pageContent = {
        'video': {
            'id': video['id'],
            'title': video['title'],
            'author': video['artist'],
            'contentURL': video['videoURL'],
            'imageURL': video['artistImageURL'],
            'views': video['views']
        }, 
        'recommendedVideos': recommendedVideos
    }

    print( pageContent)

    return jsonify(pageContent)

@app.route('/listen', methods=['GET'])
@app.route('/browse', methods=['GET'])

# audio
@app.route('/audio', methods=['GET'])
def getAudioItem():
    print( request.args['id'])



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