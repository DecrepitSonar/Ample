from flask import render_template, request, jsonify, current_app
from flask import Blueprint
from Models.models import Database as db
from Models.contentDb import BucketManager

dashboard = Blueprint('dashboard', __name__)

db = db()
bucket = BucketManager()

@dashboard.route('/', methods=['POST'])
def upload():

    sessionToken = request.cookies['xrftoken']
    user_id = db.getUserBySession(sessionToken)[0]
    user = db.getUserById(user_id)['username']

    files = request.files
    
    # upload files
    ## Upload image file
    ## Upload audio file
    bucket.upload_files(files, user_id)

    # create upload object
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

    # save object to database 
    db.postAudioTrack(audio_item)

    ## if upload failed throw error
    ### and  Delete uploaded files from s3??

    #  return
    # print(request.form)
    return jsonify({})

@dashboard.route('/', methods=['GET'])
def getDashboardData(): 
    
    user_id = db.getUserBySession(request.cookies['xrftoken'])[0]

    # get recent uploads
    uploads = db.getUploads(user_id)

    return jsonify(uploads)