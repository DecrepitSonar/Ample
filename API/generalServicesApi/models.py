from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
# from sqlalchemy import create_engine

# def initDb():
#     engine = create_engine('postgresql+psycopg2://postgres:12358132121@127.0.0.1:5432/ample')

#     if not engine:
#         return 0
#     return 

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = 'users',
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(32), default="DefaultUser")
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    imageURL = db.Column(db.Text, default='https://prophile.nyc3.cdn.digitaloceanspaces.com/images/1222ac938383d8c2708b08ee85c1b3d491797171.jpg')
    headerPosterURL = db.Column(db.Text, default='https://prophile.nyc3.cdn.digitaloceanspaces.com/images/5172658.jpg')
    type = db.Column(db.Text, default='user')
