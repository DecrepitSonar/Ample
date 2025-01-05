import os
import uuid 

from flask import Flask, request, abort, jsonify, session, make_response, redirect, g
from config import ApplicationConfig
from contentDb import contentDb
from flask_bcrypt import Bcrypt
from Models.models import Database as db
from flask_session import Session 
from flask_cors import CORS

from Auth.auth import auth
from Live.live import live
from Dashboard.dashboard import dashboard
from Admin.admin import admin

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
CORS(app, supports_credentials=True)

app.register_blueprint(auth)
app.register_blueprint(live)
app.register_blueprint(dashboard)
app.register_blueprint(admin)

with app.app_context():
    databse = db()
    uuid = uuid.uuid4()
    server_session = Session(app)
    bcrypt = Bcrypt(app)


@app.route('/whoami', methods=['GET'])
def getCurrentUser():

    if not len(request.cookies): 
        return jsonify({'error':'unauthorized'}), 401
    
    token = request.cookies['xrftoken']

    print( 'token', token  )

    if token == None: 
        return jsonify({ "error": "unauthorized user "}, 401)

    user = databse.getUserByToken(token)

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

@app.route('/user-profile', methods=['GET'])
def getUserProfile():  
    userId = request.args['id']
    user = databse.getUserProfile(userId)

    # GET USER WATCHLIST 
    # GET USER LISTENING HISTORY 
    # GET USER
    profileData = { 
        'head': user,
        'watchHistory': [],
        'audioHistory': [],
        'savedAudio': []    
    }
    
    watchHistory = databse.getUserWatchHistory(userId, 4)

    for item in watchHistory: 
        id =  item[0]

        video = contentDb['videos'].find_one({'id': id}, {'_id': 0,
                                                            'id': 1,
                                                            'title': 1,
                                                            'artistImageURL': 1,
                                                            'imageURL': 1,
                                                            'views': 1,
                                                            'artist': 1,
                                                            'videoURL': 1,
                                                            'artistId': 1})

        profileData['watchHistory'].append({
            'id': video['id'],
            'title': video['title'],
            'author': video['artist'],
            'views': video['views'],
            'posterURL': video['imageURL'],
            'imageURL': video['artistImageURL'],
            'contentURL': video['videoURL']
        })

    audioHistory = databse.getUserAudioHistory(userId, 8)

    for item in audioHistory: 
        id = item[0]
        
        
        item = contentDb['tracks'].find_one({'id': id}, {'_id': 0})


        if item is None:
            return jsonify(profileData) 
    
        profileData['audioHistory'].append({
            'id': item['id'],
            'title': item['title'],
            'name': item['name'],
            'imageURL': item['imageURL'],
            'audioURL': item['audioURL'],
            'albumId': item['albumId']
        })

    savedAudio = databse.getSavedAudio(userId)

    for item in savedAudio: 
        id = item[0]
        
        item = contentDb['tracks'].find_one({'id': id}, {'_id': 0})

        if item is None:
            return jsonify(profileData) 
    
        profileData['savedAudio'].append({
            'id': item['id'],
            'title': item['title'],
            'name': item['name'],
            'imageURL': item['imageURL'],
            'audioURL': item['audioURL'],
            'albumId': item['albumId']
        })

        

    response = jsonify(profileData) 
    return response 

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

# migrating mondo db object into psl db 
@app.route('/migrate', methods=['GET'])
# def migrateTrack():
#     tracks = contentDb['tracks'].find().limit(1)
#     for item in list(tracks ):D
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

    return jsonify( content )

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
    user_id = request.args['id']
    print( user_id )
    
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
    # print('Recommended ', recommendedVideos)
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

    if user_id != 'undefined': 
        databse.addWatchHistoryItem(videoId, user_id)

    # print( pageContent)

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

@app.route('/listen', methods=['POST'])
def updateListeningHistory(): 
    print( 'Track added to history ')

    user = databse.getUserBySession(request.cookies['xrftoken'])

    databse.addAudioHistoryItem(request.args['audio_id'], user['id'])

    return jsonify({}, 200)

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

                if( colletion == 'featuredvideos' or colletion == 'features' ):
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

    
    return jsonify( filter[filterQuery]() )

@app.route('/browse', methods=['GET'])

@app.route('/history', methods={'GET'})
def getUserHistory():

    userId = databse.getUserBySession(request.cookies['xrftoken'])['id']

    def getAudioHistory():

        audioHistory = []

        items = databse.getUserAudioHistory(userId, limit=None)

        for item in items: 
            id = item[0]
            
            item = contentDb['tracks'].find_one({'id': id})
            
            if item is None: 
                continue

            audioHistory.append({
                'id': item['id'],
                'title': item['title'],
                'author': item['name'],
                'imageURL': item['imageURL'],
                'audioURL': item['audioURL'],
                'albumId': item['albumId']
            })

        response =  jsonify(audioHistory)
        return response
    
    def getVideoHistory():
        videos = []

        watchHistory = databse.getUserWatchHistory(userId, None)

        print( watchHistory)
        for item in watchHistory: 
            id =  item[0]
            print( id )

            video = contentDb['videos'].find_one({'id': id}, {'_id': 0,
                                                                'id': 1,
                                                                'title': 1,
                                                                'artistImageURL': 1,
                                                                'imageURL': 1,
                                                                'views': 1,
                                                                'artist': 1,
                                                                'videoURL': 1,
                                                                'artistId': 1})

            videos.append({
                'id': video['id'],
                'title': video['title'],
                'author': video['artist'],
                'views': video['views'],
                'posterURL': video['imageURL'],
                'imageURL': video['artistImageURL'],
                'contentURL': video['videoURL']
            })

        return jsonify(videos)

    filter = {
        'audio': getAudioHistory,
        'video': getVideoHistory
    }

    return filter[request.args['filter']]()

@app.route('/save', methods=['GET', 'POST'])
def handleSavedContent(): 
    
    user_id = databse.getUserBySession(request.cookies['xrftoken'])['id']

    if( request.method == 'POST'):
        
        albumid =  request.json['albumId'] 
        
        if albumid is not None: 
            
            databse.saveAudioItem(user_id, request.json['id'])

            return jsonify(200)
    
    print(request.args['filter'])
    
    return jsonify(200)

# audio
@app.route('/audio', methods=['GET'])
def getAudioItem():
    print( request.args['id'])

if __name__ == "__main__":
    app.run(debug=True)
    
