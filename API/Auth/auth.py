from flask import Blueprint, current_app
from flask import Flask, request, abort, jsonify, session, make_response, redirect
from Models.models import Database as db
from flask_bcrypt import Bcrypt
from Models.contentDb import BucketManager

auth = Blueprint('auth', __name__)

databse = db()
bucketmanager = BucketManager()

@auth.route('/register', methods=['POST'])
def register_user():

    try: 
        result = databse.create_user(request.json)

    finally:
        # print( result )
        
        if result is None: 
            return jsonify({'err': "User already exists " ,'Code': 'EMAIlLERR'})
        
        databse.createUserLibrary(result)
        databse.createPaymentSettings(result)
        
        bucketmanager.create_bucket(result)
        
        return jsonify({},200)
    
@auth.route('/validate', methods=['GET'])
def confirmUserSession():

    # print('validating user')
    # print( len(list(request.cookies)))

    if len(list(request.cookies)) == 0 : 
            print( 'invalid session key' )
            return jsonify({'error': "invalid session key"})

    token = request.cookies['xrftoken']

    # print( token )
    if token == None: 
        return jsonify({'error': "invalid session key"})

    user = databse.getUserBySession(token)

    userdata = {
        'user': user, 
        'library': databse.getAllLibraryItems(user['id'])
    }

    # print( "4:",user )

    if not user: 
        return jsonify({'error': "invalid session key"})

    # print( 'user result ', user )
    # (id, username, email, password, imageURL, headerPosterURL, type) = user
    # # print( id, username, email, imageURL, headerPosterURL, type)



    # # print( response )
    # return response

    # print( userdata)
    return jsonify(userdata)

@auth.route('/validate', methods=['POST'])
def validateUser():

    user = databse.getUserByEmail(request.json['email'])

    userdata = {
        'user': user, 
        'library': databse.getAllLibraryItems(user['id'])
    }

    if user == None: 
        return jsonify({}, 404)

    return jsonify(userdata)
    
@auth.route('/login', methods=['POST', 'GET'])
def login_user():

    # print('Authenticating user')
    
    if request.method == 'POST':

        if list(request.json)[0] == 'username' : 
            user = databse.getUserByUsername(request.json['username'].lower())
        else: 
            user = databse.getUserByEmail(request.json['email'].lower())

        if user is None:
            print("user not found")
            return jsonify(
                {
                    'error': {
                        "message": "Unauthorized",
                        "errorCode": ""
                    }
                }
            ), 401
    
        if databse.validatePassword(request.json):
            # Create and save sessionId
            sessionId = databse.createUserSession( user['id'])

            userdata = {
                'user': user, 
                'library': databse.getAllLibraryItems(user['id'])
            }

            print( userdata )

            result = jsonify(userdata)
            print( sessionId)
            response = make_response(result)
            response.set_cookie("xrftoken", sessionId, httponly=True, secure=True, samesite='None')
            
        else:

            # print("failed")
            response = jsonify({"error": "Unauthorized"}), 401
    
    return response 

@auth.route('/logout', methods=['DELETE'])
def logout():

    # print( "logging out ")
# 
    session = request.cookies['xrftoken']
    # print( session )

    result = databse.deleteUserSession(session)
    # print(result)
    if result == 0: 
        jsonify({"status": "failed"}), 404

    return jsonify({"status": "success"}), 200
