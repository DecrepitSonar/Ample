from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class LivestreamPost(db.Model):
    __tablename__ = 'users',
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(32), default="DefaultUser")
    email = db.Column(db.String(345), unique=True)
    description = db.Column(db.String(32), default="new stream")
    streamKey = db.Column(db.String(32), unique=True)
