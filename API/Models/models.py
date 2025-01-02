from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from config import ApplicationConfig
import psycopg2
from flask_bcrypt import Bcrypt

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
#     headerPosterURL = db.Column(db.Text, default='https://prophile.nyc3.cdn.digit 
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
                        imageURL VARCHAR(255) NOT NULL DEFAULT , 
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

    # User
    def create_user(self, email, password):
            
        """ Check if user exists """        
        print( """ Check if user exists """ )

        if self.getUserByEmail(email) is not None:
            return None
            # return {
             #     'error': {
            #     'message': "User already exists " ,
            #    'Code': 'EMAIlLERR'}
            # }

        """ Creating New user"""
        print( """ Creating New user""" )
        
        accountSQL = """ 
            INSERT INTO accounts( 
            id,
            username, 
            avi_image_url, 
            email, 
            header_image,
            user_id,
            password
        )
        
            VALUES (DEFAULT, %s, %s, %s, %s, %s, %s) RETURNING user_id;
        """

        userSQL = """ 
            INSERT INTO users(
                id, 
                join_date, 
                user_type
            )
            VALUES (DEFAULT, DEFAULT, DEFAULT) RETURNING id;
        """

        if self.conn.closed: 
            print( 'initializing db connectino ')
            self.__init__()

        try:
            
            print( 'creating user')
            with self.conn.cursor() as cursor:
            
                cursor.execute(userSQL)

                rows = cursor.fetchone()

                if rows: 
                    userId = rows[0]
                    print( rows[0])

                    cursor.execute(accountSQL, (
                        'defaultUser',
                        'https://prophile.nyc3.digitaloceanspaces.com/images/053117.jpg',
                        email, 
                        'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/5172658.jpg',
                        userId,
                        password,
                    ))

                    return userId 
                        
        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            return error
        
        finally:
                self.conn.commit()
                self.conn.close()
                return userId   
    
    # User Sessions
    def createUserSession(self, data):
        
        print( data,'\n' )
        if self.conn.closed:
            self.__init__()

        sql = '''
            INSERT INTO user_sessions( sessions_key, user_id)
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
    
    # Watch History
    def addWatchHistoryItem(self, video_id, user_id):
        
        print( user_id)
        print( video_id)

        if self.conn.closed:
            self.__init__()

        update_watch_history = """
            INSERT INTO watch_history ( id, user_id, video_id )
            VALUES (DEFAULT, %s, %s)
        """ 

        check_if_exist = """
            SELECT * 
            FROM watch_history 
            WHERE video_id = '%s'
        """ %video_id

        try: 
            with self.conn.cursor() as cursor:

                cursor.execute(check_if_exist)
                print( cursor.statusmessage )
                if cursor.fetchone() is not None:
                    return 
                
                cursor.execute(update_watch_history, (user_id, video_id))
                print( cursor.statusmessage ) 
    
        except ( self.conn.DatabaseError, Exception) as error: 
            print( error )
        
        finally:
            self.conn.commit()
            self.conn.close()

            return
    
    # Listening History
    def addAudioHistoryItem( self, id, user_id):

        print( id, user_id )

        if self.conn.closed:
            self.__init__()

        sql = """
            INSERT INTO audio_history ( id, audio_id, user_id, time_created, date_created)
            VALUES ( DEFAULT, %s, %s, DEFAULT, DEFAULT)     
        """

        check_Track_exists_sql = """
            SELECT *
            FROM audio_history
            WHERE audio_id = '%s'
        """ %id

        update_audio_record = """ 
            UPDATE audio_history
            SET time_created = DEFAULT
            WHERE audio_id = '%s'
        """ %id

        try:
            with self.conn.cursor() as cursor: 
                
                cursor.execute(check_Track_exists_sql)
                result = cursor.fetchone()

                if result is not None:
                        
                    cursor.execute(update_audio_record)
                    print( cursor.statusmessage )    
                    
                    return

                cursor.execute(sql, ( id, user_id))
                print( cursor.statusmessage )
        
        except( self.conn.DatabaseError, Exception) as error: 
            print( error )
        
        finally: 
            self.conn.commit()
            self.conn.close()
            return 
    
    # Save audio items
    def saveAudioItem(self, user_id, id):

        if self.conn.closed:
            self.__init__()

        sql = """
            INSERT INTO saved_audio ( id, user_id, audio_id, date_created, time_created )
            VALUES ( DEFAULT, %s, %s, DEFAULT, DEFAULT)
        """

        check_if_item_exist = """
            SELECT * FROM saved_audio 
            WHERE audio_id = '%s'
        """ %id

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(check_if_item_exist)
                result = cursor.fetchone()
                print( cursor.statusmessage)
                 
                if result is not None: 
                    return 
                
                cursor.execute(sql, (user_id, id))
                print( cursor.statusmessage )
                self.conn.commit()

        except(self.conn.DatabaseError, Exception) as error:
            print( error )

        finally: 
            self.conn.close()
            return 
        
    # Save video items

    # GET 
    def getUserById(self, id):

        if self.conn.closed:
            self.__init__()

        sql = """SELECT * FROM users WHERE id = '%s' """ %id
        user_account = """ SELECT  user_id, username, avi_image_url, email, header_image, verified  FROM accounts """

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                # print( '2:', cursor.statusmessage )
                # print( cursor.query)
                
                user_id = cursor.fetchone()[0]
                # print( user_id )

                cursor.execute(user_account)
                # print( '3:', cursor.statusmessage )
                # print( cursor.query)
                result = cursor.fetchone()
                # print( result )

                if result is not None: 

                    (
                        id,
                        username,
                        avi_image_url,
                        email,
                        header_image,
                        verified,
                    ) = result
                    

                    result =  {
                            "id": id,
                            "username": username,
                            "email": email,
                            "imageURL": avi_image_url,
                            "headerPosterURL": header_image,
                            'verified': verified
                    }

        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            return 
        
        finally: 
            self.conn.close()
            # print( result )
            return result
    def getUserByEmail(self, email):

        if self.conn.closed: 
            self.__init__()

        sql = """ 
        SELECT user_id, username, avi_image_url, email, header_image, verified, password 
        FROM accounts 
        WHERE email LIKE '%s' """ %email

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                
                results = cursor.fetchone()
                print( results )

                if results is not None: 
                
                    (
                        id,
                        username,
                        avi_image_url,
                        email,
                        header_image,
                        verified,
                        password 
                    ) = results

                    results = {
                        "user" : {
                            "id": id,
                            "username": username,
                            "email": email,
                            "imageURL": avi_image_url,
                            "headerPosterURL": header_image,
                            'verified': verified
                        },
                        "password": password
                    }

        except (self.conn.DatabaseError, Exception) as error: 
            print( '\n Error', error , '\n' )
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
                FROM user_sessions
                WHERE sessions_key = '%s' )
                
            SELECT user_id
            FROM rows
        ''' %sessionId

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                # print( '1:', cursor.statusmessage )
                result = cursor.fetchone()[0]

                user = self.getUserById(result)
# 
        except( self.conn.DatabaseError, Exception) as error :
            print( error )

        finally:

            self.conn.close()
            return user       
    
    # WATCH HISTORY
    def getUserWatchHistory(self, user_id, limit):
        
        if self.conn.closed:
            self.__init__() 

        sql = """
            SELECT video_id 
            FROM watch_history
            WHERE user_id = '%s'
        """ %user_id
        
        sql_with_limit = """
            SELECT video_id 
            FROM watch_history
            WHERE user_id = '%s'
            LIMIT 4
        """ %user_id

        try: 
            with self.conn.cursor() as cursor: 
                if limit is None:
                    cursor.execute( sql )
                    print( cursor.statusmessage)

                cursor.execute(sql_with_limit)

                result = cursor.fetchall()

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            return result
    
    # LISTENING HISTORY
    def getUserAudioHistory(self, user_id, limit ):

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT audio_id 
            FROM audio_history 
            WHERE user_id = '%s'
            ORDER BY time_created DESC;
        """ %user_id

        sql_with_limit = """
            SELECT audio_id 
            FROM audio_history 
            WHERE user_id = '%s'
            ORDER BY time_created DESC
            LIMIT 8;
        """ %user_id
        try: 
            with self.conn.cursor() as cursor: 

                if limit is not None:
                    cursor.execute( sql_with_limit)
                    result = cursor.fetchall()
                    return
                
                cursor.execute( sql)
                result = cursor.fetchall()

        except(self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            self.conn.close()
            return result

    # PROFILE 
    def getUserProfile(self, user_id):

        print( user_id )
        if self.conn.closed: 
            self.__init__()

        profile_sql = """
            CREATE VIEW profile AS
            
                SELECT * 
                FROM users
                WHERE id = '%s'
        
        """ %user_id
        try: 
            with self.conn.cursor() as cursor: 
                # cursor.execute(profile_sql)
                # user = cursor.fetchone()
                # print( user )

                user = self.getUserById(user_id)
                print( user )


        except ( self.conn.DatabaseError, Exception) as error:
            print( error )

        finally: 
            return user
        
    # Get saved content
    def getSavedAudio(self, user_id):
        
        if self.conn.close:
            self.__init__()

        sql = """
            SELECT audio_id 
            FROM saved_audio
            WHERE user_id = '%s'
        """ %user_id

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchall()

        except( self.conn.DatabaseError, Exception) as error:
            print( error )

        finally: 
            return result
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
            DELETE FROM user_sessions
            WHERE sessions_key = '%s'
        ''' %sessionId
        
        print( sessionId)

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute( sql )
                result = cursor.statusmessage
                self.conn.commit()

                # print( result )

        except( self.conn.DatabaseError, Exception) as error:
            print( error  )

        finally:
            self.conn.close() 
            return result



    def postAudioTrack(self, item):

        if self.conn.closed: 
            self.__init__()

        sql = ''' 
        INSERT INTO audio ( 
        id,
        tracknum, 
        genre, 
        title, 
        author, 
        imageurl, 
        audiourl, 
        albumid,
        playcount,
        authorid )

        VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''

        try: 
            with self.conn.cursor() as cursor: 
                print( item )
                cursor.execute(sql, (
                    item['id'],
                    item['tracknum'],
                    item['genre'],
                    item['title'],
                    item['author'],
                    item['imageurl'],
                    item['audiourl'],
                    item['albumid'],
                    item['playcount'],
                    item['authorid']
                    ))
                
                self.conn.commit()

        except ( self.conn.DatabaseError, Exception) as error:
            print( error )
            self.conn.close()
            return
        finally: 
            self.conn.close()
            return

        
