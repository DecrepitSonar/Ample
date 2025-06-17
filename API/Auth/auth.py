from flask import Blueprint, current_app
from flask import Flask, request, abort, jsonify, session, make_response, redirect, Response
from Models.models import Database as db
from flask_bcrypt import Bcrypt
from Models.contentDb import BucketManager
from utils import AuthCodes
import os 

auth = Blueprint('auth', __name__)

databse = db()
bucketmanager = BucketManager()

@auth.route('/register', methods=['POST'])
def register_user():
        
        # returns id as result 
        result = databse.create_user(request.json)

        print( result )

        if ( result is None):
            
            return jsonify({
                    'error': {
                    "status": 'unauthorized',
                    "message": AuthCodes.REG_ERR.value,
                    "errorCode": "AUTHERROR"
                }
            })
        
        elif( result is False):
            
            return jsonify({
            'error': {
                    "status": 'unauthorized',
                    "message": AuthCodes.SRVERR.value,
                    "errorCode": "AUTHERROR"
                }
            })
        
        bucketmanager.create_bucket(result)

        return jsonify(result)

@auth.route('/register/details', methods=['POST'])
def updateAccountSettings(): 

    uploader = BucketManager()
    
    id = request.form['id']

    data = {
        'id': id,
        'username': request.form['username'],
        'profileImage': 'https://'+ id + '.nyc3.digitaloceanspaces.com/' + request.files['profileImage'].filename
    }
    uploader.upload_files(request.files, id)
    
    databse.updateUserDetails(data)

    return jsonify({}), 200

@auth.route('/register/details/interests', methods=['POST'])
def addUserInterests(): 
    print( request.form)
    #  TO DO
    #  Insert interests for user 
    #  return user account details

    return jsonify({}, 200)

@auth.route('/validate', methods=['GET'])
def confirmUserSession():

    if len(list(request.cookies)) == 0 : 
            print( 'invalid session key length' )
            return jsonify({'error': "invalid session key"})

    token = request.cookies['xrftoken']

    if token == None: 
        return jsonify({'error': "invalid session key"})

    id = databse.getUserBySession(token)

    if ( id is None ):
        return jsonify({'error': "invalid session key"})
    
    user = databse.getUserById(id)

    if not user: 
        return jsonify({'error': "invalid session key"})

    return user

@auth.route('/validate', methods=['POST'])
def validateUser():

    user = databse.getUserByEmail(request.json['email'])
    print( user )

    if user == None: 
        return jsonify({}, 404)

    return jsonify(user)
    
@auth.route('/login', methods=['POST', 'GET'])
def login_user():

    print('Authenticating user')
    
    print( request.json)
    if request.method == 'POST':

        if list(request.json)[0] == 'username' : 
            id = databse.getUserByUsername(request.json['username'].lower())

            if id is None:
                print("user not found")
                return jsonify(
                    {
                        'error': {
                            'status': 'unauthorized',
                            "message": "invalid email or password",
                            "errorCode": "AUTH_USR_ERROR"
                        }
                    }
                ), 200
        
        else: 
            print( request.json['email'])
            user = databse.getUserByEmail(request.json['email'])
            print( user)

            if user is None:
                print("user not found")
                return jsonify(
                    {
                        'error': {
                            'status': 'unauthorized',
                            "message": "invalid username or password",
                            "errorCode": "EMAIlLERR"
                        }
                    }
                ), 200
        print( user['id'])
        try: 
            
            databse.validatePassword(user['id'], request.json['password'])

            # Create and save sessionId
            print( "creating user sessions ")
            sessionId = databse.createUserSession( user['id'] )
            print( sessionId)
            print( 'sessionId', sessionId)

            if sessionId is  None:
                return jsonify(
                {
                    'error': {
                        'status': 'Internal Error',
                        "message": error,
                        "errorCode": "Srv_Error"
                    }
                }, 500)

            result = jsonify(user)

            response = make_response(result)
            response.set_cookie("xrftoken", sessionId, httponly=True, secure=True, samesite='None')

            
        except( Exception ) as error:

            if error is not False:
                return jsonify(
                {
                    'error': {
                        'status': 'Internal Error',
                        "message": error,
                        "errorCode": "Srv_Error"
                    }
                }
            ), 200
            
            else:
                return jsonify(
                    {
                        'error': {
                            'status': 'unauthorized',
                            "message": "invalid password",
                            "errorCode": "PWError"
                        }
                    }
                ), 200
    
    return result 

@auth.route('/logout', methods=['DELETE'])
def logout():

    print( "logging out ")

    session = request.cookies['xrftoken']
    print( session )

    result = databse.deleteUserSession(session)
    if result == 0: 
        jsonify({"status": "failed"}), 404
    
    request.cookies.clear()

    return jsonify({"status": "success"}), 200

# TODO
# UPGRADE USER ROLE TO 
# - CREATOR