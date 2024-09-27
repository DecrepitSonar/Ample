import pymongo

client = pymongo.MongoClient('mongodb+srv://rob:12358132121@cluster0.xadsk.mongodb.net/ampleDev?retryWrites=true&w=majority')

contentDb = client['myFirstDatabase']
