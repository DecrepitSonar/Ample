from flask import Blueprint, jsonify, request, make_response

admin = Blueprint('admin', __name__, url_prefix='/admin')

@admin.route('/', methods=['GET'])
def getAdminHomePage(): 
    return 'This is an admin home page'

@admin.route('/dashboard', methods=['GET'])
def getDashboard():
    
    try: 
        token = request.cookies['xrftoken']
        response = make_response()
        response.headers.set('Authorization', token)
        print( response.headers.get_all)
        response.location = 'http://localhost:3000'
        return response
    
    except KeyError as error: 
        if error: 
            response = make_response()
            response.location = "http://localhost:5173/listen"
            return response 
