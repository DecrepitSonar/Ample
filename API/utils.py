import boto3
from flask import g 
from enum import Enum 

class AuthCodes(Enum):
    AUTHERROR = 'Invalid username or password'
    SRVERR = "Internal Server error"
    REG_ERR = "User already exists, try logging in or changing password"
