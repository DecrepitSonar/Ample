from dotenv import load_dotenv
import os 


load_dotenv()

class ApplicationConfig:
    SECRET_KEY=os.environ['SECRET_KEY']

    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_ECHO=True
    SQLALCHEMY_DATABASE_URI= r"postgresql://postgres:12358132121@127.0.0.1:5432/ample"
    
    # SESSION_TYPE='redis'
    # SESSION_PERMANENT= False
    # SESSION_USE_SIGNER= True
    # SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')