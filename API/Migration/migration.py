from flask import Blueprint

migration = Blueprint('migration', __name__, url_prefix='/migrate') as app

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

def migrateUsers():
    users = contentDb['artists'].find({})
