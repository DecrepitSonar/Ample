from flask import render_template, request, jsonify, current_app
from flask import Blueprint
from Models.models import Database as db
from Models.contentDb import BucketManager

profile = Blueprint('profile', __name__, url_prefix='/profile')

databse = db()
bucketmanager = BucketManager()

@profile.route('/library/save', methods=['POST'])
def handleSavedContent(): 
    
    user_id = databse.getUserBySession(request.cookies['xrftoken'])
    
    databse.saveItemToLibary(request.json, user_id)
    
    return jsonify(databse.getSavedItems(user_id))

@profile.route('/library', methods=['GET'])
def getUserProfile():  

    user_id = databse.getUserBySession(request.cookies['xrftoken'])
    print(databse.getSavedItems(user_id))

    return jsonify(databse.getSavedItems(user_id))

@profile.route('/library/playlist', methods=['GET'])
def getUserPlaylists(): 
    
    user_id = databse.getUserBySession(request.cookies['xrftoken'])[0]
    playlists = databse.getUserPlaylists(user_id)
    print( playlists)

    return jsonify(playlists)
@profile.route('/library/playlist', methods=['POST'])
def savePlaylist(): 

    print( 'creating playlist')
    
    sessionId = request.cookies['xrftoken']
    user_id = databse.getUserBySession(sessionId=sessionId)[0]
    
    databse.createNewPlaylist(user_id, request.json)

    return jsonify({})

@profile.route('/library/playlist/save', methods=['POST'])
def saveItemToPlaylist(): 
    user_id = databse.getUserBySession(request.cookies['xrftoken'])[0]
    
    playlist_id = request.json['playlistId']
    item = request.json['item']
    
    databse.addItemToPlaylist(playlist_id, item, user_id)
    playlists = databse.getUserPlaylists(user_id)

    return jsonify(playlists)

# User Settings
@profile.route('/settings/account', methods=['GET'])
def getAccountSettings(): 
    print( 'Getting Account Settings')

    sessionId = request.cookies['xrftoken']
    id = databse.getUserBySession(sessionId)

    accountSettings = databse.getAccountSettings(id)

    return jsonify(accountSettings)

@profile.route('/settings/account', methods=['POST'])
def updateAccountSettings(): 
    print('updating account settings ')
    
    
    sessionId = request.cookies['xrftoken']

    # print( sessionId )
    print( request.files)
    headerimage = request.files['headerimage'].filename 
    profileimage =  request.files['profileimage'].filename

    id = databse.getUserBySession(sessionId)[0]

    data = {
        'id': id,
        'username': request.form['username'],
        'headerimage': 'https://'+ id + '.nyc3.digitaloceanspaces.com/' + headerimage,
        'profileimage': 'https://'+ id + '.nyc3.digitaloceanspaces.com/' + profileimage
    }

    print( data )

    databse.updateUserAccountSettings(data, id)

    bucketmanager.upload_files(request.files, id)
    
    user =  databse.getUserById(data['id'])

    return jsonify({user}, 200)

@profile.route('/settings/upgrade', methods={'POST'})
def upgradeUserPrilvilages():
    id = databse.getUserBySession(request.cookies['xrftoken'])[0]
    user = databse.upgradeUserToCreator(id)

    return jsonify(user)

@profile.route('/settings/payment', methods=['GET'])
def getPaymentSettings():
    sessionId = request.cookies['xrftoken']
    id = databse.getUserBySession(sessionId )

    paymentSettings = databse.getPaymentSettings(id)

    return jsonify(paymentSettings)

@profile.route('/settings/payment', methods=['POST'])
def updatePaymentSetings(): 
    print( request.form)
    return jsonify({}, 200)

@profile.route('/settings/security', methods=['GET'])
def getSecuritySettings(): 
    print( request.form)
    return jsonify({}, 200)

@profile.route('/settings/security', methods=['POST'])
def updateSecuritySettings(): 
    session = request.cookies['xrftoken']

    id = databse.getUserBySession(session)[0]
    print( id )
    # print( request.json)
    password = request.json['password']

    if databse.validatePassword(id, password ) is False: 
        return jsonify({
            "type": 'invalid', 
            'fields': ['password'],
            'message': 'current password field is invalid '
        }, 200)

    if databse.updatUserPassword(id, password) is False: 
        return jsonify({
            "type": 'internal error', 
            'fields': ['password'],
            'message': 'could not reset password, try again '
        }, 200)


    return jsonify({}, 200)

@profile.route('/settings/notifications', methods=['GET'])
def getNotificationSettings(): 
    return jsonify(200)

@profile.route('/settings/notifications', methods=['POST'])
def updateNotificationSettings(): 
    print( request.form)
    return jsonify({}, 200)

@profile.route('/settings/privacy', methods=['GET'])
def getPrivacySettings():
    return jsonify({}, 200)

@profile.route('/settings/privacy', methods=['POST'])
def updatePrivacySettings(): 

    print( request.form)
    return jsonify({}, 200)