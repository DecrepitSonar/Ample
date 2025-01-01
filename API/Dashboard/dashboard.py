
from flask import render_template, request
from flask import Blueprint

dashboard = Blueprint('dashboard', __name__, url_prefix='/dashboard')

# Dashboard 
@dashboard.route('/', methods=['GET'])
def dash():
    return render_template('home.html')

@dashboard.route('/dashboard/login', methods=['GET'])
def dashLogin():
    return render_template('login.html')

@dashboard.route('/dashboard/signup', methods=['GET', 'POST'])
def dashSignUp():
    # user = jsonify({
    #     'username': request.json['username'],
    #     'email': request.json['email'],
    #     'password': request.json['password'],
    #     'city': request.json['city'],
    #     'type': request.json['type']
    # })
    # print( user)
    print(request.headers)
    return render_template('signup.html')
