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

    # Initiate multipart upload 
    def create_multiPart_upload(self): 
        
        # print( response['UploadId'] )

        # upload_id = response['UploadId']

        return upload_id
    
    # upload part
    def upload_file(self, file, id):
        self.client.upload_file( ApplicationConfig.UPLOAD_FOLDER + file, id, file)
        return

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
                                'Name': 'Some_bucket'
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
    
    # delete bucket
    def delete_bucket(self, user): 
        return
