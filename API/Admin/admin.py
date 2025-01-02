from flask import Blueprint, jsonify

admin = Blueprint('admin', __name__, url_prefix='/admin')

@admin.route('/', methods=['GET'])
def getAdminHomePage(): 
    return 'This is an admin home page'
