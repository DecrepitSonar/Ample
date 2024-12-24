import os
from flask import Flask, request, abort, jsonify, session, make_response, redirect

from flask_bcrypt import Bcrypt
# from models import db, User
from config import ApplicationConfig
from flask_session import Session 
from flask_cors import CORS
from flask import render_template
from contentDb import contentDb
from models import Database as db

import uuid

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

CORS(app, supports_credentials=True)

server_session = Session(app)
bcrypt = Bcrypt(app)
# db.init_app(app)

with app.app_context():
    # db.create_all()
    databse = db()
    # databse.create_tables()


# Auth
@app.route('/whoami', methods=['GET'])
def getCurrentUser():

    if not len(request.cookies): 
        return jsonify({'error':'unauthorized'}), 401
    
    token = request.cookies['xrftoken']

    print( 'token', token  )

    if token == None: 
        return jsonify({ "error": "unauthorized user "}, 401)

    user = User.getUserByToken(token)

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

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try: 
        result = databse.create_user(email, hashed_password)
        print( "result", result ) 
        return result
    
    finally:
        if result is None: 
            return {
                'error': {
                    'message': "User already exists " ,
                'Code': 'EMAIlLERR'}
            }
        
        return jsonify({'id': result }),200

@app.route('/validate', methods=['GET'])
def confirmUserSession():
    print('validating user')
    print( len(list(request.cookies)))

    if len(list(request.cookies)) == 0 : 
            return jsonify({'error': "invalid session key"})

    token = request.cookies['xrftoken']

    print( token )
    if token == None: 
        return jsonify({'error': "invalid session key"})

    user = databse.getUserBySession(token)

    print( user )


    # if not user: 
    #     return jsonify({'error': "invalid session key"})

    # print( 'user result ', user )
    # (id, username, email, password, imageURL, headerPosterURL, type) = user
    # # print( id, username, email, imageURL, headerPosterURL, type)

    # response = jsonify({
    #     "id": id,
    #     "username": username,
    #     "email": email,
    #     "imageURL": imageURL,
    #     "headerPosterURL": headerPosterURL,
    #     "type": type
    # })

    # # print( response )
    # return response
    return jsonify({}, 200)

@app.route('/validate', methods=['POST'])
def validateUser():
    email = request.json['email']

    user = databse.getUserByEmail(email)

    if user == None: 
        print( "User is none")
        return jsonify({}, 404)
    
    print( "User found")
    return jsonify(user)
    
@app.route('/login', methods=['POST', 'GET'])
def login_user():

    print('Authenticating user')
    print( request.headers['User-Agent'] )
    print( request.method)
    
    if request.method == 'POST':
            
        if( request.headers['User-Agent'] == 'Ample/1 CFNetwork/1568.100.1 Darwin/24.0.0'):
            user = databse.getUserByUsername(request.json['username'])

        data = databse.getUserByEmail(request.json['email'])

        if data is None:
            print("user not found")
            return jsonify(
                {
                    'error': {
                        "message": "Unauthorized",
                        "errorCode": ""
                    }
                }
            ), 401
        
        print( data )
        
        user = data['user']
        password = data['password']


        print('Authenticating web client')

        request_password = request.json['password']
        
        print( bcrypt.check_password_hash(password, request_password) )
    

        if bcrypt.check_password_hash(password, request_password):

        #     # Create and save sessionId
            sessionId = str(uuid.uuid4())

            databse.createUserSession({
                'id': user['id'],
                'sessionId': sessionId
            })

            result = jsonify(user)
            print( result )
            response = make_response(result)
            response.set_cookie("xrftoken", sessionId, httponly=True, secure=True, samesite='None')
            
        else:

            print("failed")
            response = jsonify({"error": "Unauthorized"}), 401
    
    # return response 
    return response
      
  
@app.route('/user', methods=['GET'])
def getUser():
    userId = request.args['id']
    # print( userId )

    user = databse.getUserById(userId)
    (id, username, email, password, imageURL, headerPosterURL, type) = user

    if user != None:

        return jsonify({
            "id": id,
            "username": username,
            "email": email,
            "imageURL": imageURL,
            "headerPosterURL": headerPosterURL,
            "type": type
        }), 200

    return jsonify({})

@app.route('/user-0rofile', methods=['GET'])
def getUserProfile():  
    userId = request.args['id']

    user = databse.getUserById(userId)
    (id, username, email, password, imageURL, headerPosterURL, type) = user
    
    print( user )
    return jsonify({
            "id": id,
            "username": username,
            "email": email,
            "imageURL": imageURL,
            "headerPosterURL": headerPosterURL,
            "type": type
        }), 200

@app.route('/updateSettings', methods=['PUT'])
def updateUserSettings(): 

    print( 'updateing user with request',request )
    file = request.files['imageURL']

    # Check if filename is empty
    # if empty theres no uploaded file
    if( file.filename == ''):
        return redirect( request.url)
    else:
        # Save file to fs or CDN
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

    user = databse.getUserByUsername(request.form['username'])

    if(user is not None):
        return jsonify({'error': 'Username not available'}),200
    
    user = databse.updateUsername(request.form)
    

    return jsonify({}), 200

@app.route('/logout', methods=['DELETE'])
def logout():
    print( "logging out ")

    session = request.cookies['xrftoken']
    print( session )

    result = databse.deleteUserSession(session)
    
    if result == 0: 
        jsonify({"status": "failed"}), 404

    return jsonify({"status": "success"}), 200

# migrating mondo db object into psl db 
@app.route('/migrate', methods=['GET'])
# def migrateTrack():
#     tracks = contentDb['tracks'].find().limit(1)
#     for item in list(tracks ):
#         track = {
#             'id': item['id'],
#             'tracknum':item['trackNum'], 
#             'genre': item['genre'], 
#             'title': item['title'], 
#             'author': item['name'], 
#             'imageurl': item['imageURL'], 
#             'audiourl': item['audioURL'], 
#             'albumid': item['albumId'],
#             'playcount': item['playCount'],
#             'authorid': item['artistId']
#         }
#         databse.postAudioTrack(track)
#     return jsonify({})

def migrateUsers():
    users = contentDb['artists'].find({})

    # for user in list(users) :


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
    }).limit(7)


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
    }).limit(7)

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
                                                'artist': 1}).limit(4)): 
        
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
            'features': [],
            'relatedVideos': []
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
                                          'albumId':1,
                                      }).sort('trackNum')


    content['head']['playlist'] = {
        'id': playlist['id'],
        'title': playlist['title'],
        'author': playlist['name'],
        'imageURL': playlist['imageURL'],
        'artistId': playlist['artistId'],
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
    
    for item in list(albums): 
        content['albums'].append({
            'id': item['id'],
            'title': item['title'],
            'imageURL': item['imageURL'],
            'author': item['name']
        })

    related = contentDb['videos'].find({'artistId': author['id']},{'_id': 0,
                                                                            'id': 1,
                                                                            'title': 1,
                                                                            'artistImageURL': 1,
                                                                            'imageURL': 1,
                                                                            'views': 1,
                                                                            'artist': 1,
                                                                            'videoURL': 1,
                                                                            'artistId': 1})
    
    for item in list(related): 
        # print( item, '\n' )
        content['relatedVideos'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['artist'],
            'contentURL': item['videoURL'],
            'imageURL': item['artistImageURL'],
            # 'views': video['views']
        })

    # print( content)

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
    
    recommendedVideos = list(contentDb['videos'].find({}, {'_id': 0,
                                                           'id': 1,
                                                           'title': 1,
                                                            'artistImageURL': 1,
                                                            'imageURL': 1,
                                                            'views': 1,
                                                            'artist': 1,
                                                            'videoURL': 1,
                                                            'artistId': 1}))
    print('Recommended ', recommendedVideos)
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
def getAudioPageContent():
    content = {
        'featured': [],
        'new': [],
        'trending': [],
        'genres': {
            'alternative': [],
            'rnb': [],
            'hiphop': []
        },
        'playlists': []
    }

    features = list(contentDb['features'].find({'type': "Audio"},{'_id': 0}))
    
    for item in features:
        content['featured'].append({
            'id': item['id'],
            'author': item['artist'],
            'title': item['title'],
            'imageURL': item['imageURL'],
        })

    newMusic = contentDb['albums'].find({'type': 'Album'},{'_id': 0}).sort('releaseDate').limit(7)

    for item in list(newMusic):
        content['new'].append({
            'id': item['id'],
            'author': item['name'],
            'title': item['title'],
            'imageURL': item['imageURL'],
            
        })

    trending = contentDb['tracks'].find({},{'_id': 0}).limit(12).sort('playCount')
    for item in list(trending):
        content['trending'].append({
            'id': item['id'],
            'title': item['title'],
            'name': item['name'],
            'imageURL': item['imageURL'],
            'audioURL': item['audioURL'],
            'albumId': item['albumId']
        })

    alternativeGenre = contentDb['albums'].find({'genre': 'Alternative','type':'Album'}).limit(7).sort('releaseDate')

    for item in list(alternativeGenre):
        content['genres']['alternative'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['name'],
            'imageURL': item['imageURL']
        })

    rnb = contentDb['albums'].find({'genre': 'RnB','type':'Album'}).limit(7).sort('releaseDate')
    for item in list(rnb):
        content['genres']['rnb'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['name'],
            'imageURL': item['imageURL']
        })

    hiphop = contentDb['albums'].find({'genre': 'Hip-Hop', 'type':'Album'}).limit(7).sort('releaseDate')
    for item in list(hiphop):
        content['genres']['hiphop'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['name'],
            'imageURL': item['imageURL']
        })
    
    playlists = contentDb['albums'].find({'type':'playlist'},{'_id': 0}).limit(7).sort('datePosted')
    for item in list(playlists):
        content['playlists'].append({
            'id': item['id'],
            'title': item['title'],
            'imageURL': item['imageURL']
        })

    print( content['featured'])
    return jsonify(content)

@app.route('/search', methods=['GET'])
def handleSearchQuery():
    print( list(request.args))

    filterQuery = request.args['filter']
    searchQuery = request.args['query']
    searchResult = []

    def queryAll(): 
        if searchQuery != '': 
            collections = contentDb.list_collection_names()
            results = []

            collectionQueries = {
                'albums': queryAlbums,
                'tracks': queryTrack,
                'artists': queryUsers,
                'videos' : queryVideos
            }   

            for colletion in collections:

                if( colletion == 'featuredvideos'):
                    continue
                
                for item in collectionQueries[colletion]():
                    print( item )

                    results.append(item)
                    
                print( results  )

            
            return results 

        return 

    def queryUsers():
        if searchQuery != '': 
            return list(contentDb['artists'].find({'name': {'$regex': f'^{ searchQuery }','$options': 'i'}}, {'_id': 0}))
        return
    
    def queryVideos():
        if searchQuery != '': 
            return list(contentDb['videos'].find({'title': {'$regex': f'^{ searchQuery }','$options': 'i'}}, {'_id': 0}))
        return
    
    def queryAlbums():
        if searchQuery != '': 
            return list(contentDb['albums'].find({'title': {'$regex': f'^{ searchQuery }','$options': 'i'},'type': 'Album'}, {'_id': 0}))
        return []
    
    def queryPodcasts(): 
        if searchQuery != '': 
            return list(contentDb['podcasts'].find({'name': {'$regex': f'^{ searchQuery }','$options': 'i'}}, {'_id': 0}))
        return []
    
    def queryPlaylists():
        if searchQuery != '': 
            return list(contentDb['albums'].find({'title': {'$regex': f'^{ searchQuery }','$options': 'i'},'type': 'playlist'}, {'_id': 0}))
        return []
    
    def queryTrack():
        if searchQuery != '': 
            return list(contentDb['tracks'].find({'title': {'$regex': f'^{ searchQuery }','$options': 'i'},'type': 'playlist'}, {'_id': 0}))
        return []
    
    filter = {
        'All': queryAll,
        'User': queryUsers,
        'Video': queryVideos,
        'Album': queryAlbums,
        'Podcast': queryPodcasts,
        'Playlist': queryPlaylists,
        'track': queryTrack
    }

    
    print( searchResult )

    return jsonify(filter[filterQuery]())

@app.route('/browse', methods=['GET'])

# audio
@app.route('/audio', methods=['GET'])
def getAudioItem():
    print( request.args['id'])

if __name__ == "__main__":
    app.run(debug=True)
    