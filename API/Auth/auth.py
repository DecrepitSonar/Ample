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

    user = databse.getUserByEmail(email)
    email = request.json['email']

    if user == None: 
        print( "User is none")
        return jsonify({}, 404)
    
    print( "User found")
    return jsonify(user)
    
@auth.route('/login', methods=['POST', 'GET'])
def login_user():

    print('Authenticating user')
    
    if request.method == 'POST':
            
        if len(request.json['username'].split('@')) > 1 : 
            data = databse.getUserByEmail(request.json['username'].lower())
        else: 
            data = databse.getUserByUsername(request.json['username'].lower())

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
            sessionId = str(uuid)
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
    # response.headers.add('Access-Control-Allow-Origin', '*')
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
