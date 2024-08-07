from flask import Flask, request, abort, jsonify, session
from flask_bcrypt import Bcrypt
from models import db, User
from config import ApplicationConfig
from flask_session import Session 
from flask_cors import CORS
from flask import render_template

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

CORS(app, supports_credentials=True)

server_session = Session(app)
bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/whoami', methods=['GET'])
def getCurrentUser():
    user_id = session.get('user_id')

    print('user_id')
    
    if not user_id: 
        return jsonify({'error':'unauthorized'}), 401
    
    user = User.query.filter_by(id=user_id).first()

    print(user)


    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "imageURL": user.imageURL,
        "headerPosterURL": user.headerPosterURL,
        "type": user.type
    }), 200

@app.route('/register', methods=['POST'])
def register_user():
    email = request.json['email']
    password = request.json['password']

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"})

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session['user_id'] = new_user.id

    print(new_user)

    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "imageURL": new_user.imageURL,
        "headerPosterURL": new_user.headerPosterURL,
        "type": new_user.type
    }), 200



@app.route('/login', methods=['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()
    print("Found User:", user.password)

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    print( bcrypt.check_password_hash(user.password, password)) 
        # return jsonify({"error": "Unauthorized"}), 401
    
    session['user_id'] = user.id

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "imageURL": user.imageURL,
        "headerPosterURL": user.headerPosterURL,
        "type": user.type
    }), 200

@app.route('/logout', methods=['POST'])
def logout():
    print( request.json)

    session.pop('user_id')

    return jsonify({"status": "success"}), 200

# Dashboard 
@app.route('/dashboard', methods=['GET'])
def dash():
    return render_template('home.html')

@app.route('/dashboard/login', methods=['GET'])
def dashLogin():
    return render_template('login.html')

@app.route('/dashboard/signup', methods=['GET', 'POST'])
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

if __name__ == "__main__":
    app.run(debug=True)