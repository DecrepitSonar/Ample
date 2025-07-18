import boto3
from flask import g 
from enum import Enum 

class AuthCodes(Enum):
    AUTHERROR = 'Invalid username or password'
    SRVERR = "Internal Server error"
    REG_ERR = "User already exists, try logging in or changing password"

class PageSection:
    def __init__(self, title, items, type):
        self.title = title
        self.items = items
        self.type = type

    