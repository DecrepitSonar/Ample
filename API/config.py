from dotenv import load_dotenv
import os 
import redis

# from models import create_tables

load_dotenv()

class ApplicationConfig:

    UPLOAD_FOLDER = '/Users/robertaubow/Dev/alto/API/static/downloads/'
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'webp'}
    
    IMAGE_CDN = 'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/'
    
    aws_access_key_id=os.environ['aws_access_key_id'] = 'DO006YCR9QKM2U74N27H'
    aws_secret_access_key= os.environ['aws_secret_access_key'] = '/BPNSKIg6H69vFW4hSWlxtwFk8O+bMoQwuV8TfNjKtc'

    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_ECHO=True
    SQLALCHEMY_DATABASE_URI= r"postgresql://postgres:12358132121@127.0.0.1:5432/avi_dev"
    SQLALCHEMY_ADMIN_DATABASE_URI= r"postgresql://postgres:12358132121@127.0.0.1:5432/avi_admin"
    
    SESSION_TYPE='redis'
    SESSION_PERMANENT= False
    SESSION_USE_SIGNER= True
    SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')
    SESSION_SECRETE_KEY = 'SECRET KEY'

