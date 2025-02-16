from flask import Blueprint, current_app
from flask import Flask, request, abort, jsonify, session, make_response, redirect
from Models.models import Database as db
from flask_bcrypt import Bcrypt
from contentDb import BucketManager

import uuid 

auth = Blueprint('auth', __name__)

databse = db()
uuid = uuid.uuid4()
# server_session = Session(auth)
bcrypt = Bcrypt()
bucketmanager = BucketManager()

@auth.route('/register', methods=['POST'])
def register_user():
    
    email = request.json['email']
    password = request.json['password']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try: 
        result = databse.create_user(email, hashed_password)
        print( result )

    finally:
        print( result )
        
        if result is None: 
            return {
                'error': {
                    'message': "User already exists " ,
                'Code': 'EMAIlLERR'}
            }
        
        bucketmanager.create_bucket(result)
        
        return jsonify({},200)
    
@auth.route('/validate', methods=['GET'])
def confirmUserSession():

    print('validating user')
    print( len(list(request.cookies)))

    if len(list(request.cookies)) == 0 : 
            print( 'invalid session key' )
            return jsonify({'error': "invalid session key"})

    token = request.cookies['xrftoken']

    print( token )
    if token == None: 
        return jsonify({'error': "invalid session key"})

    user = databse.getUserBySession(token)

    print( "4:",user )


    if not user: 
        return jsonify({'error': "invalid session key"})

    # print( 'user result ', user )
    # (id, username, email, password, imageURL, headerPosterURL, type) = user
    # # print( id, username, email, imageURL, headerPosterURL, type)



    # # print( response )
    # return response
    return jsonify(user)

@auth.route('/validate', methods=['POST'])
def validateUser():

    user = databse.getUserByEmail(request.json['email'])

    if user == None: 
        return jsonify({}, 404)

    return jsonify(user)
    
@auth.route('/login', methods=['POST', 'GET'])
def login_user():

    print('Authenticating user')
    
    if request.method == 'POST':
        
        print("Key error ", list(request.json)[0])

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
            databse.createUserSession( user['id'])

            result = jsonify(user)
            response = make_response(result)
            response.set_cookie("xrftoken", sessionId, httponly=True, secure=True, samesite='None')
            
        else:

            print("failed")
            response = jsonify({"error": "Unauthorized"}), 401
    
    return response 

@auth.route('/logout', methods=['DELETE'])
def logout():

    print( "logging out ")

    session = request.cookies['xrftoken']
    print( session )

    result = databse.deleteUserSession(session)
    print(result)
    if result == 0: 
        jsonify({"status": "failed"}), 404

    return jsonify({"status": "success"}), 200
