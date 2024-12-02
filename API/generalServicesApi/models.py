from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from config import ApplicationConfig
import psycopg2
# from sqlalchemy import create_engine

# def initDb():
#     engine = create_engine('postgresql+psycopg2://postgres:12358132121@127.0.0.1:5432/ample')

#     if not engine:
#         return 0
#     return 

# db = SQLAlchemy()

def get_uuid():
    return uuid4().hex


# class User(db.Model):
#     __tablename__ = 'Users',
#     id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
#     username = db.Column(db.String(32), unique=True, default=f'DefaultUser')
#     email = db.Column(db.String(345), unique=True)
#     password = db.Column(db.Text, nullable=False)
#     imageURL = db.Column(db.Text, default='https://prophile.nyc3.cdn.digitaloceanspaces.com/images/1222ac938383d8c2708b08ee85c1b3d491797171.jpg')
#     headerPosterURL = db.Column(db.Text, default='https://prophile.nyc3.cdn.digitaloceanspaces.com/images/5172658.jpg')
#     type = db.Column(db.Text, default='user')
#     # sessionId = db.Table.

#     def updateUserData(data):
#         print('data', data)
#         columns = list(data.keys())
#         print( columns )

#         user = User.getUserById(data['id'])

#         print( user )
#         # handle error if user not found

#         for column in columns:
#             print('column:',data[column])
#             setattr(user, column, data[column])

#         db.session.commit()
            

#     def getUserById(id):
#         return db.session.execute(db.select(User).filter_by(id=id)).scalar_one()
    
#     def getUserByEmail(email):
#         return db.session.execute(db.select(User).filter_by(email=email)).scalar_one()
    
#     def getUserByUsername(username):
#         return db.session.execute(db.select(User).filter_by(username=username)).first()
    
#     def getUserByToken(token):
#         query = db.session.execute(db.select(User).filter_by(sessionId=token)).scalar_one()
#         if not query:
#             return None
        
#         return query
        
# class UserSessions(db.Model):
#     _tablename_ = 'Sessions',
#     id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)

#     # def validateSession(sessionId)
#     # def getSession(sessionId)

#     db.session.commit()

class Database:

    conn = None

    def __init__(self): 
        
        """ connect to pstgres server"""
        try: 
            with psycopg2.connect(ApplicationConfig.SQLALCHEMY_DATABASE_URI) as connection:
                print(('Connected to postgres server'))
                self.conn = connection

        except (psycopg2.DatabaseError, Exception) as error: 
            print( error)
            return   
    def create_tables(self):
        
        if self.conn.closed:
            self.__init__()

        ''' create User Table'''
        commands = (
            """
                CREATE TABLE users (
                        id VARCHAR(255) PRIMARY KEY,
                        username VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        password VARCHAR(255) NOT NULL, 
                        imageURL VARCHAR(255) NOT NULL, 
                        headerPosterURL VARCHAR(255) NOT NULL,
                        type VARCHAR(16) NOT NULL
                )
            """,
            """
                CREATE TABLE sessions (
                    sessionId VARCHAR(255) PRIMARY KEY,
                    id VARCHAR(255),
                    CONSTRAINT userSession FOREIGN KEY( id ) REFERENCES users(id)
                )
            """
        )

        try: 
            print( 'Creating user tables')
            with self.conn.cursor() as cursor:
                for command in commands: 
                    cursor.execute(command)
            self.conn.commit()

            print( "Tables created successfully")
            self.conn.close()

        except (self.conn.DatabaseError, Exception) as error:
            print( error )
            self.conn.close()
            return error
    
    # CREATE 
    def create_user(self, email, password):

            
        """ Check if user exists """        
        print( """ Check if user exists """ )

        if self.getUserByEmail(email) is not None:
            return {
                'error': {
                'message': "User already exists " ,
                'Code': 'EMAIlLERR'}
            }

        """ Creating New user"""
        print( """ Creating New user""" )

        sql = """ 
            INSERT INTO users(id, username, email, password, imageURL, headerPosterURL, type)
            VALUES (%s,%s, %s, %s, %s, %s, %s) RETURNING id;
        """
    
        sessionSql = """
            INSERT INTO sessions ( sessionId )
            id VARCHAR
        """

        if self.conn.closed: 
            print( 'initializing db connectino ')
            self.__init__()

        try:
            
            print( 'creating user')
            with self.conn.cursor() as cursor:
                cursor.execute(sql, (
                    get_uuid(),
                    'defaultUser',
                    email, 
                    password,
                    'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/1222ac938383d8c2708b08ee85c1b3d491797171.jpg',
                    'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/5172658.jpg',
                    'User'  
                ))

                rows = cursor.fetchone()
                if rows: 
                    userId = rows[0]
                    print( rows[0])
                    return userId
                
                    
        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            return error
        
        finally:
                self.conn.commit()
                self.conn.close()
                return userId
    def createUserSession(self, data):
        
        print( data )
        if self.conn.closed:
            self.__init__()

        sql = '''
            INSERT INTO sessions(
            sessionid, id)
            VALUES (%s, %s)
        ''' 

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql, (data['sessionId'], data['id']))
                self.conn.commit()

        except( Exception, self.conn.DatabaseError) as error:
            print( error )

        finally: 
            self.conn.close
            return
    # GET 
    def getUserById(self, id):

        print( self.conn.closed )

        if self.conn.closed:
            self.__init__()

        sql = """
            SELECT * 
            FROM users 
            WHERE id = '%s'
        """ %id

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                
                print( cursor.statusmessage )
                
                result = cursor.fetchone()
                print( 'result', result )
                
                if result is not None: 
                    print( result[0])
                    return result

        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            # return 
        
        finally: 
            return result
    def getUserByEmail(self, email):

        if self.conn.closed: 
            self.__init__()

        print( 'SELECT (id, username, imageURL) FROM users WHERE  email LIKE', email)
        sql = """ 
        SELECT * 
        FROM users 
        WHERE email LIKE '%s'  """ % email
        password = ''

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                
                results = cursor.fetchone()
                print( results )

                if results is not None: 
                    # results =  results[0]
                    print( results  )

                    # print( 'results', list(results))
                    (id, username, imageURL, password, email, headerPosterURL, type) = results
                    # print( list(map(list, zip(*results)))  )
                    # data = []
                    # for x in results[0]:
                        # data.append(x)
                        # if x == ',':
                            # pass
                        
                    # ( id) = results
                    print( email, password)
                    results = {
                        "user" : {
                            "id": id,
                            "username": username,
                            "email": email,
                            "imageURL": imageURL,
                            "headerPosterURL": headerPosterURL,
                            "type": type
                        },
                        'password': password
                    }

        except (self.conn.DatabaseError, Exception) as error: 
            print( 'errors', error )
            return error
        
        finally: 
            self.conn.close()
            return results 
    def getUserByUsername(self, username):

        if self.conn.closed: 
            self.__init__()

        print( 'SQL: SELECT id FROM users WHERE  username LIKE ', username)
        sql = """ 
            SELECT username 
            FROM users 
            WHERE username = '%s'  
            """ %username
        

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                
                results = cursor.fetchall() 

                if results is not None: 
                    results = results[0]

        except (Exception, self.conn.DatabaseError) as error: 
            print( 'errors', error )
            return error
        
        finally: 
            self.conn.close()
            return results
    def getUserBySession(self, sessionId):
        if self.conn.close:
            self.__init__()

        sql = '''
            with rows as (
                SELECT * 
                FROM sessions
                WHERE sessionid = '%s'
            )
            SELECT id 
            FROM rows
        ''' %sessionId

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchall()

                ( id ) = result[0]

                user = self.getUserById(id)

        except( self.conn.DatabaseError, Exception) as error :
            print( )

        finally:
            return user       
    
    # UPDATE 
    def updateUsername(self, data):

        if self.conn.closed:
            self.__init__()
        
        print( 'data', data)

        sql = ''' UPDATE users
            SET username = %s
            WHERE id = %s '''

        # if self.getUserById(data['id']) is not None:

        try:
            with self.conn.cursor() as cursor:
                cursor.execute(sql, (data['username'], data['id']))
                updated_rows = cursor.rowcount
                print( 'updated_rows', updated_rows)

            self.conn.commit()

        except (Exception, self.conn.DatabaseError) as error:
            print('error', error )
            return

        finally:
            return updated_rows
    
    # UPDATE
    def updateUserSession(self, session):

        if self.conn.closed:
            self.__init__()

        sql = '''
            insert sessions,
            SET id = '%s', sessionId = '%s'
        '''   
    def deleteUserSession(self, sessionId):
        
        if self.conn.closed:
            self.__init__()
        
        print('removiing user session ' )
        
        sql = '''
            DELETE FROM sessions
            WHERE sessionid = '%s'
        ''' %sessionId
        
        print( sessionId )

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute( sql )
                result = cursor.statusmessage
                self.conn.commit()

                # print( result )

        except( self.conn.DatabaseError, Exception) as error:
            print(  )

        finally:
            self.conn.close() 
            return result


        

        
