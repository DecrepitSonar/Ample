from dotenv import load_dotenv
import os 
import redis

# from models import create_tables

load_dotenv()

class ApplicationConfig:

    UPLOAD_FOLDER = '/Users/robertaubow/Documents/Ample/API/generalServicesApi/static/downloads/'
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'webp'}
    IMAGE_CDN = 'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/'

    SECRET_KEY=os.environ['SECRET_KEY']

    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_ECHO=True
    SQLALCHEMY_DATABASE_URI= r"postgresql://postgres:12358132121@127.0.0.1:5432/alto_dev"
    
    SESSION_TYPE='redis'
    SESSION_PERMANENT= False
    SESSION_USE_SIGNER= True
    SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')

