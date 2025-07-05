from flask import render_template, request, jsonify, current_app
from flask import Blueprint
from Models.models import Database as db
from Models.contentDb import BucketManager

profile = Blueprint('profile', __name__, url_prefix='/profile')

databse = db()
bucketmanager = BucketManager()

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