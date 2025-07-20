from flask import render_template, request, jsonify, current_app
from flask import Blueprint
from Models.models import Database as db
from Models.contentDb import BucketManager

dashboard = Blueprint('dashboard', __name__, url_prefix='/dashboard')

db = db()
bucket = BucketManager()

@dashboard.route('/upload', methods=['POST'])
def upload():

    sessionToken = request.cookies['xrftoken']
    user_id = db.getUserBySession(sessionToken)[0]
    user = db.getUserById(user_id)['username']

    files = request.files
    
    # upload files
    bucket.upload_files(files, user_id)

    def uploadSingle():
        audio_item = {
            'title': request.form['title'], 
            'genre':request.form['genre'],
            'imageurl':'https://'+ user_id + '.nyc3.digitaloceanspaces.com/' + request.files['imageurl'].filename,
            'category': request.form['category'],

            'contenturl': 'https://'+ user_id + '.nyc3.digitaloceanspaces.com/' + request.files['audio_file'].filename, 
            'author_id': user_id,
            'author': user, 
            'type': request.form['type'],
        }

        db.postAudioTrack(audio_item)
    
    def uploadPlaylist():
        playlist_item = {
            'title': request.form['title'], 
            'genre':request.form['genre'],
            'imageurl':'https://'+ user_id + '.nyc3.digitaloceanspaces.com/' + request.files['imageurl'].filename,
            'category': request.form['category'],
            'author_id': user_id,
            'author': user, 
            'type': request.form['type'],
        }

        # save object to database 
        db.postPlaylist(playlist_item)
        return jsonify({})

    handleUploadType = {
        'Single': uploadSingle,
        'Playlist': uploadPlaylist
    }

    handleUploadType[request.form['type']]()
    
    return jsonify({})


@dashboard.route('/', methods=['GET'])
def getDashboardData(): 
    
    user_id = db.getUserBySession(request.cookies['xrftoken'])[0]

    # get recent uploads

    return jsonify({})

@dashboard.route('/uploads', methods=['GET'])
def getUserUploads():
    user_id = db.getUserBySession(request.cookies['xrftoken'])[0]

    uploads = []

    audio = db.getAudioUploads(user_id)
    if audio is not None:
        for x in list(audio):
            uploads.append(x)
    
    playlists = db.getPlaylistUploads(user_id)
    if playlists is not None:
        for x in list(playlists):
            uploads.append(x)

    return jsonify(uploads)

@dashboard.route('/edit/playlist', methods=['GET'])
def getUserPlaylist(): 
    playlist_id = request.args['playlist_id']
    print( playlist_id)

    playlist = {
        'head': db.getPlaylistById(playlist_id),
        'body': db.getItemByPlaylist_id(playlist_id)
    }

    return jsonify(playlist)

@dashboard.route('/edit/playlist/upload', methods=['DELETE'])
def deletePlaylistItem():
    
    db.deletePlaylistTrackById(request.args['id'])
    tracks = db.getAudioUploadsByPlaylistId(request.args['playlist_id'])
    print( tracks)

    return jsonify(tracks)
@dashboard.route('/edit/playlist/upload', methods=['POST'])
def uploadPlaylistTrack(): 
    print( request.form)
    sessionToken = request.cookies['xrftoken']
    user_id = db.getUserBySession(sessionToken)[0]
    
    files = request.files
    bucket.upload_files(files, user_id)

    audio_item = {
        'title': request.form['title'], 
        'genre':request.form['genre'],
        'imageurl':request.form['imageurl'],
        'category': request.form['category'],
        'playlist_id': request.form['playlist_id'],
        'contenturl': 'https://'+ request.form['author_id'] + '.nyc3.digitaloceanspaces.com/' + request.files['audio_file'].filename, 
        'author_id': request.form['author_id'],
        'author': request.form['author'], 
        'type': request.form['type'],
    }

    db.postPlaylistAudioTrack(audio_item)
    

    tracks = db.getAudioUploadsByPlaylistId(request.form['playlist_id'])
    
    if tracks is not None: 
        print( tracks)
        return jsonify(tracks)
    
    return jsonify([])

@dashboard.route('/edit/playlist', methods=['POST'])
def updatePlaylist(): 
    editType =  request.args['edit']
    print( request.form)
    print( editType )

    return jsonify({})

