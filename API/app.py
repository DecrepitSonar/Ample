import os
import uuid 
import random
import string

from flask import Flask, request, abort, jsonify, session, make_response, redirect, g
from config import ApplicationConfig
from Models.contentDb import BucketManager, contentDb
from flask_bcrypt import Bcrypt
from Models.models import Database as db
from flask_session import Session 
from flask_cors import CORS

from Auth.auth import auth
from Profile.userProfile import profile
from Admin.admin import admin

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
CORS(app, supports_credentials=True)

app.register_blueprint(auth)
# app.register_blueprint(live)
app.register_blueprint(profile)
app.register_blueprint(admin)

with app.app_context():
    databse = db()
    uuid = uuid.uuid4()
    server_session = Session(app)

@app.route('/library/save', methods=['POST'])
def handleSavedContent(): 
    
    user_id = databse.getUserBySession(request.cookies['xrftoken'])
    
    databse.saveItemToLibary(request.json, user_id)
    
    return jsonify(databse.getSavedItems(user_id))

@app.route('/library', methods=['GET'])
def getUserProfile():  

    user_id = databse.getUserBySession(request.cookies['xrftoken'])


    return jsonify(databse.getSavedItems(user_id))

@app.route('/creator-profile', methods=['GET'])
def getArtistProfile():
    
    id =  request.args['id']
    print( id )

    data = {
        'creator': {},
        'trending': [],
        'albums': [],
        'singles': []

    }

    creator = contentDb['artists'].find_one({'id': id }, {'__v': 0, '_id': 0})
    data['creator'] = creator

    trending = contentDb['tracks'].find({'artistId': id},{'_id': 0}).limit(6).sort('playCount')
    for item in list(trending):
        data['trending'].append({
            'id': item['id'],
            'title': item['title'],
            'name': item['name'],
            'imageURL': item['imageURL'],
            'audioURL': item['audioURL'],
            'albumId': item['albumId']
        })
     
    albums = contentDb['albums'].find({'type': 'Album', 'artistId': id},{'_id': 0}).sort('releaseDate').limit(7)

    for item in list(albums):
        data['albums'].append({
            'id': item['id'],
            'author': item['name'],
            'title': item['title'],
            'imageURL': item['imageURL'],
            'type': item['type']
        })

    print( data['albums'])

    singles = contentDb['albums'].find({'type': 'Single', 'artistId': id},{'_id': 0}).sort('releaseDate').limit(7)

    for item in list(singles):
        data['singles'].append({
            'id': item['id'],
            'author': item['name'],
            'title': item['title'],
            'imageURL': item['imageURL'],
            'type': item['type']
        })

    print( data['singles'] )
    
    return jsonify(data)


# Content
@app.route('/', methods=['GET'])
def home():

    # print( request.user_agent )
    content = []

    # content = {
    #     'featured': [],
    #     'podcasts': [],
    #     'music': [],
    #     'artists': [],
    #     'videos': []
    # }

    featuredVideos = contentDb['featuredvideos'].find(
        {
            'type': 'Featured Video'
        },
        {
            "_id": 0, 
            "id": 1, 
            "title": 1, 
            "artist": 1, 
            'imageURL': 1,
            'videoURL':1
        }
    )

    featuredContent = {
        'id': uuid, 
        'type': 'Featured',
        'tagline': 'Discover', 
        'items': []
    }

    for item in list(featuredVideos):

        featuredContent['items'].append(
            {
                'id': item['id'],
                "type": 'video',
                'title': item['title'],
                'author': item['artist'],
                'posterImage': item['imageURL'],
                'contentURL': item['videoURL']
            }
        )
    
    content.append(featuredContent)

    videos = {
        'id': uuid, 
        'type': 'Videos',
        'tagline': 'Videos', 
        'items': []
    }
    
    Videos = contentDb['videos'].find({},
        {
            "_id": 0, 
            "id": 1, 
            "title": 1, 
            "artistImageURL": 1,
            "posterURL": 1, 
            "artist": 1,
            "type": 1 
        }
    ).limit(5)
    
    
    for item in list(Videos):
        print(  'item', item, '\n',)
        videos['items'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['artist'],
            'imageURL': item['artistImageURL'],
            'posterURL': item['posterURL'],
            'type': item['type']
        })
    

    content.append(videos)

    musicContent = {
        'id': uuid, 
        'type': 'Music',
        'tagline': 'Music', 
        'items': []
    }

    music = contentDb['albums'].find({},{
        "_id":0,
        'id': 1,
        'title': 1, 
        'name': 1,
        'imageURL': 1,
        'type': 1
    }).limit(7)


    for item in list(music): 
        musicContent['items'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['name'],
            'imageURL': item['imageURL'],
            'type': item['type']
        })

    content.append(musicContent)

    trendingArtists = {
        'id': uuid, 
        'type': 'Artists',
        'tagline': 'Trending Artists', 
        'items': []
    }

    artists = contentDb['artists'].find({},{
        '_id': 0,
        'id': 1,
        'name': 1,
        'imageURL': 1
    }).limit(7)

    # print( databse.getCreators())
    
    for item in list(artists):
        trendingArtists['items'].append({
            'id': item['id'],
            'username': item['name'],
            'imageURL': item['imageURL']
    })
        
    content.append(trendingArtists)


    musicVideos = {
        'id': uuid, 
        'type': 'Music Videos',
        'tagline': 'Music Videos', 
        'items': []
    }
    
    for item in list(contentDb['videos'].find(
        {
            'type': 'music'
        },
        {
            '_id': 0,
            'id': 1,
            'title': 1,
            'artistImageURL': 1,
            'posterURL': 1,
            'views': 1,
            'artist': 1
        }
    ).limit(4)):
        
        musicVideos['items'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['artist'],
            'imageURL': item['artistImageURL'],
            'posterURL': item['posterURL']
        })
    
    content.append(musicVideos)

    for item in content:
        print( '\n', item)

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
                                                'artistId': 1,
                                                'type': 1})
    
    author = contentDb['artists'].find_one({'id': playlist['artistId']},
                                           {
                                               '_id': 0,
                                               'id': 1,
                                               'imageURL': 1,
                                               'name': 1,
                                               'type': 1
                                           })
    
    content['features'].append({
        'id': author['id'],
        'username': author['name'],
        'imageURL': author['imageURL'],
        'type': author['type']
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
                                          'type': 1
                                      }).sort('trackNum')


    content['head']['playlist'] = {
        'id': playlist['id'],
        'title': playlist['title'],
        'author': playlist['name'],
        'imageURL': playlist['imageURL'],
        'artistId': playlist['artistId'],
        'type': playlist['type']
    } 

    content['head']['author'] = {
        'id': author['id'],
        'imageURL': author['imageURL'],
        'username': author['name']
    }

    for item in list(tracks): 
        print( item )
        content['head']['tracks'].append(
            {
                'id': item['id'],
                'title': item['title'],
                'author': item['name'],
                'audioURL': item['audioURL'],
                'artistId': item['artistId'],
                'imageURL': item['imageURL'],
                'albumId': item['albumId'],
                'type': item['type']
            }
        )

    albums = contentDb['albums'].find({'artistId': author['id']},{'_id': 0,})
    
    for item in list(albums): 
        content['albums'].append({
            'id': item['id'],
            'title': item['title'],
            'imageURL': item['imageURL'],
            'author': item['name'],
            'type': item['type']
        })

    related = contentDb['videos'].find({'artistId': author['id']},{'_id': 0})
    
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

    print( content)

    return jsonify(content)

@app.route('/watch', methods=['GET'])

@app.route('/video', methods=['GET'])
def getVideo():
    videoId = request.args['videoId']
    user_id = request.args['id']
    
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
    comments = databse.getCommentsByVideoId(videoId)
    print( comments )

    video_comments = []

    if comments is not None: 

        for x in comments: 

            (id, imageurl, username, date_created, comment ) = x
            
            video_comments.append({
                "id": id, 
                "imageURL": imageurl, 
                "username": username,
                "comment": comment, 
                "date_created": date_created
            })
    
    pageContent = {
        'video': {
            'id': video['id'],
            'title': video['title'],
            'author': video['artist'],
            'contentURL': video['videoURL'],
            'imageURL': video['artistImageURL'],
            'views': video['views']
        }, 
        'comments': video_comments,
        'recommendedVideos': recommendedVideos
    }

    # if user_id != 'undefined': 
    #    - databse.addWatchHistoryItem(videoId, user_id)

    # print( pageContent)

    return jsonify(pageContent)

@app.route('/video/comment', methods=['POST'])
def postComment(): 
    
    result = databse.postComment( request.json )
    print( result )

    return jsonify({}, 200)

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

    newMusic = contentDb['albums'].find(
        {'type': 'Album'},
        {'_id': 0, 
         'id': 1,
         'name': 1,
         'title': 1,
         'imageURL': 1,
         'type': 1
         }).sort('releaseDate').limit(7)

    for item in list(newMusic):
        content['new'].append({
            'id': item['id'],
            'author': item['name'],
            'title': item['title'],
            'imageURL': item['imageURL'],
            'type': item['type']
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

    alternativeGenre = contentDb['albums'].find({'genre': 'Alternative','type':'Album'},
            {'_id': 0}).limit(7).sort('releaseDate')

    for item in list(alternativeGenre):
        content['genres']['alternative'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['name'],
            'imageURL': item['imageURL'],
            'type': item['type']
        })

    rnb = contentDb['albums'].find({'genre': 'RnB','type':'Album'}).limit(7).sort('releaseDate')
    for item in list(rnb):
        content['genres']['rnb'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['name'],
            'imageURL': item['imageURL'],
            'type': item['type']
        })

    hiphop = contentDb['albums'].find({'genre': 'Hip-Hop', 'type':'Album'}).limit(7).sort('releaseDate')
    for item in list(hiphop):
        content['genres']['hiphop'].append({
            'id': item['id'],
            'title': item['title'],
            'author': item['name'],
            'imageURL': item['imageURL'],
            'type': item['type']
        })
    
    playlists = contentDb['albums'].find({'type':'playlist'},{'_id': 0}).limit(7).sort('datePosted')
    for item in list(playlists):
        content['playlists'].append({
            'id': item['id'],
            'title': item['title'],
            'imageURL': item['imageURL'],
            'type': item['type']
        })

    print( content['featured'])
    return jsonify(content)

@app.route('/listen', methods=['POST'])
def updateListeningHistory(): 
    print( 'Track added to history ')

    user = databse.getUserBySession(request.cookies['xrftoken'])

    databse.addAudioHistoryItem(request.args['audio_id'], user['id'])

    return jsonify({}, 200)

@app.route('/listen/random', methods=['GET'])
def getRandomTrack(): 
    print("random")

    tracks = list(contentDb['tracks'].aggregate([{'$sample': {'size': 1}}]))

    for item in tracks: 
          track = {
            'id': item['id'],
            'title': item['title'],
            'name': item['name'],
            'imageURL': item['imageURL'],
            'audioURL': item['audioURL'],
            'albumId': item['albumId']
        }
        
    return jsonify(track)

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
                    results.append(item)
            
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

    userId = databse.getUserBySession(request.cookies['xrftoken'])

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


@app.route('/migrate/audio', methods=['GET'])
def migrateTrack():
    tracks = contentDb['tracks'].find()
    for item in list(tracks ):
        track = {
            'track_number':item['trackNum'], 
            'title': item['title'], 
            'author': item['name'], 
            'image_url': item['imageURL'], 
            'audio_url': item['audioURL'], 
            'album_id': item['albumId'],
            'play_count': item['playCount'],
            'author_id': item['artistId'],
            'type': "audio",
            'genre': item['genre']
        }
        databse.postAudioTrack(track)
    return jsonify({})

@app.route('/migrate/users', methods=['GET'])
def migrateUsers():

    def random_char(char_num):
       return ''.join(random.choice(string.ascii_letters) for _ in range(char_num))

    users = contentDb['artists'].find({})

    for item in list(users ):

        user = {
            'type': item['type'].lower(), 
            'username': item['name'],
            'image_url': item['imageURL'],
            'email': random_char(7)+"@gmail.com",
            'password': 'none'
        }
        
        databse.addUser(user)

        # print( user )

    return jsonify({})


if __name__ == "__main__":
    app.run(debug=True)
    
