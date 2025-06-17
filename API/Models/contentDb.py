import pymongo
import boto3
import os 
from config import ApplicationConfig

client = pymongo.MongoClient('mongodb+srv://rob:12358132121@cluster0.xadsk.mongodb.net/ampleDev?retryWrites=true&w=majority')

contentDb = client['myFirstDatabase']

class BucketManager:

    session = None
    client = None

    def __init__(self):

        # self.session = boto3.session.Session()
        self.client = boto3.client('s3',
                        region_name='nyc3',
                        endpoint_url='https://nyc3.digitaloceanspaces.com',
                        aws_access_key_id=os.environ['aws_access_key_id'],
                        aws_secret_access_key=os.environ['aws_secret_access_key'])


    # create Bucket 
    def create_bucket(self, id):
        print( 'creating user bucket')

        response = self.client.create_bucket(
                        ACL='public-read',
                        Bucket=id,
                        CreateBucketConfiguration={
                            'LocationConstraint': 'us-east-2',
                            'Location': {
                                'Type': 'AvailabilityZone',
                                'Name': 'user_bucket'
                            },
                            'Bucket': {
                                'DataRedundancy': 'SingleAvailabilityZone',
                                'Type': 'Directory'
                            }
                        },
                        # GrantFullControl='string',
                        # GrantRead='string',
                        # GrantReadACP='string',
                        # GrantWrite='string',
                        # GrantWriteACP='string',
                        ObjectLockEnabledForBucket=False,
                        ObjectOwnership='BucketOwnerPreferred'
                    )


        print( response  )
        return 

    # Initiate multipart upload 
    def create_multiPart_upload(self): 
        
        # print( response['UploadId'] )

        # upload_id = response['UploadId']

        return upload_id
    
    # upload part
    def upload_file(self, file, id):
        try:
            self.client.upload_file( 
                ApplicationConfig.UPLOAD_FOLDER + file, 
                id, 
                file, 
                ExtraArgs={'ACL': 'public-read'}
            )

        except self.client._exceptions as e: 
            print( e )

        return

    def upload_files(self, files, id): 

        for filename in files:    
            file = files[filename] 
            file.save(os.path.join(ApplicationConfig.UPLOAD_FOLDER, file.filename))

            self.upload_file(file.filename, id )

    # delete bucket
    def delete_bucket(self, user): 
        return
    
class DBManager: 

    def __init__(self):
        pass
    
    # USER CONTENT
    # def getUser;
    # def getUserProfile:
    # def getUserSettings:
    # def getVideoWithId(id):
    # def getCreatorProfile(id):

    # PAGE CONTENT
    # def getHomePageContent(userSessionKey):
    # def getPlaylistItem(id):


