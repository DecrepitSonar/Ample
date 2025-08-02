import boto3
from flask import g, session, request, redirect, current_app
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

    
def login_required(func):
    if 'cookie' not in session: 
        request.json({'message':'user not logged in'})
        # redirect('http://127.0.0.1:5170/login')
        
    return func()
    
