import json
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify, request
from uuid import uuid4
from config import ApplicationConfig
import psycopg2
from flask_bcrypt import Bcrypt
from utils import AuthCodes


def get_uuid():
    return uuid4().hex

class Database:

    conn = None 
    bcrypt = Bcrypt()

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
    
    # AUTH
    def create_user(self, data):
            
        """ Check if user exists """        
        print( """ Check if user exists """ )
        
        email = data['email'] 
        if self.getUserByEmail(data['email']) is not None:
            return None

        """ Creating New user"""
        print( """ Creating New user""" )
        
        createUser = """ 
            INSERT INTO users (email)
            VALUES ( '%s' )

            RETURNING id; 
        """ %data['email']

     
        if self.conn.closed: 
            print( 'initializing db connectino ')
            self.__init__()

        try:
            
            print( 'creating user')
            
            with self.conn.cursor() as cur: 
                cur.execute( createUser, (email) )
                id = cur.fetchone()[0]
                
                print( id )
                print( 'user created')
                
                self.createUserWallet(id)
                self.createUserLibrary(id)

                hashed_password = self.bcrypt.generate_password_hash(data['password']).decode('utf-8')
                self.createUserSecurityDetails(hashed_password, id )

        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            result =  AuthCodes( 'SRVERR')
        
        finally:
                self.conn.commit()
                self.conn.close()
                return id
    def createUserWallet( self, id): 

        createUserWallet = """
            INSERT INTO user_wallet (user_id)
            VALUES ( '%s' )
        """ %id

        if self.conn.closed: 
            print( 'initializing db connectino ')
            self.__init__()

        try:
            with self.conn.cursor() as cursor:
                print( 'creating user Wallet')
                cursor.execute( createUserWallet)   

                print( cursor.statusmessage)
                print( 'user wallet created')
                
                result = None

        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            result = False
        
        finally:
                self.conn.commit()

                return result
    def createUserLibrary( self, id): 

        createUserLibrary = """
            INSERT INTO user_library ( user_id ) 
            VALUES ('%s')
        """ %id
     
        if self.conn.closed: 
            print( 'initializing db connectino ')
            self.__init__()

        try:

            with self.conn.cursor() as cursor:
            
                print( 'creating user library')
                cursor.execute(createUserLibrary)   

                print( cursor.statusmessage)
                print( 'user library created')
                result = None

        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            result = False
        
        finally:
                self.conn.commit()

                return result
    def createUserSecurityDetails( self, password, id ): 

        createUserSecurity = """
            INSERT INTO security ( password, user_id) 
            VALUES ( %s, %s )
        """

        if self.conn.closed: 
            print( 'initializing db connectino ')
            self.__init__()

        try:

            with self.conn.cursor() as cursor:
                print( 'creating user security')
                cursor.execute( createUserSecurity,( password, id ))   

                print( cursor.statusmessage)
                print( 'user security created')

                result = id

        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            result = False
        
        finally:
                self.conn.commit()
                return result   
    def getUserById(self, id):

        print( id )

        if self.conn.closed:
            self.__init__()

        # sql = """SELECT * FROM users WHERE id = '%s' """ %id
        # user_account = """ SELECT  id, username, avi_image_url, email, header_image, verified  FROM users """

        sql = """ 
        SELECT row_to_json(t)
        FROM (
            SELECT 
                id,
                username, 
                accounttype, 
                email, 
                profileimage, 
                headerimage
            FROM users
            WHERE id = '%s'
        ) t """ %id

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                # print( '2:', cursor.statusmessage )
                # print( cursor.query)
                
                user = cursor.fetchone()[0]
                print( user )

                # cursor.execute(user_account)
                # print( '3:', cursor.statusmessage )
                # print( cursor.query)
                # result = cursor.fetchone()
                # print( result )

                # if result is not None: 

        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            return 
        
        finally: 
            self.conn.close()
            # print( result )
            return user    
    def getUserByEmail(self, email):

        print( 'Retrieving user by email')
        if self.conn.closed: 
            self.__init__()

        sql = """ 
        SELECT row_to_json(t)
        FROM (
            SELECT 
                id,
                username, 
                accounttype, 
                email, 
                profileimage, 
                headerimage
            FROM users
            WHERE email = '%s'
        ) t """ %email

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                # print( cursor.statusmessage)
                # print( cursor.query)
                rows = cursor.fetchone()
                # print(rows)
                if rows is not None:
                    # print( rows )
                    result = rows[0]
                    return result

                result = None

        except (self.conn.DatabaseError, Exception) as error: 
            print( '\n Error', error , '\n' )
            return error
        
        finally: 
            # print( result )
            self.conn.close()
            return result      
    def getUserByUsername(self, username):

        if self.conn.closed: 
            self.__init__()

        sql = """ 
            SELECT username 
            FROM users 
            WHERE username = '%s'  
            """ %username
        

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                
                results = cursor.fetchone()
                
                print( results)
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
                SELECT user_id
                FROM security
                WHERE session_key = '%s'
        ''' %sessionId

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchone()
    # 
        except( self.conn.DatabaseError, Exception) as error :
            print( 'error', error )
            result = None

        finally:

            self.conn.close()
            return result   
    def validatePassword(self, id, password):

        print( 'validating user password  ')

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT password
            FROM security
            WHERE user_id = '%s'
        """ %id

        try: 
            with self.conn.cursor() as cursor: 

                cursor.execute(sql)
                result = cursor.fetchone()[0]
                print( cursor.statusmessage )
                # print( "passwords result", result )

                if self.bcrypt.check_password_hash(result, password):
                    result = True
                    return
                
                else: 
                    result = False

        except( self.conn.DatabaseError, Exception) as error: 
            print( 'error')
            print( error )
            result = False
            raise( Exception(error))
        
        finally: 
            return result
    def createUserSession(self, id):
        if self.conn.closed:
            self.__init__()

        sql = '''
            UPDATE security
            SET session_key = %s
            WHERE user_id = %s
        ''' 

        try: 
            with self.conn.cursor() as cursor:
                session = get_uuid()
                print( session )
                cursor.execute(sql, (session, id))
                print( 'update status ', cursor.statusmessage )
                if cursor.statusmessage == 'UPDATE 0': 
                    session = None 
                
                self.conn.commit()

        except( Exception, self.conn.DatabaseError) as error:
            print( error )

        finally: 
            self.conn.close
            return session
    def deleteUserSession(self, sessionId):
        
        if self.conn.closed:
            self.__init__()
        
        print('removiing user session ' )
        
        print( sessionId)
        
        sql = '''
            UPDATE security
            SET session_key = ''
            WHERE session_key = '%s'
        ''' %sessionId

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute( sql )
                result = cursor.statusmessage

                print( result )

        except( self.conn.DatabaseError, Exception) as error:
            print( error  )

        finally:
            self.conn.commit()
            self.conn.close() 
            return result
    
    # Content
    def getFeaturedContent(self):
        if self.conn.closed:
            self.__init__()

        sql = """
            SELECT row_to_json(t)
            FROM (
                SELECT * 
                FROM playlist
                INNER JOIN featured
                ON playlist.id::TEXT = featured.ref_id 
            )t
        """

        try:
            with self.conn.cursor() as cursor: 
                
                cursor.execute(sql)
                result = cursor.fetchone()
                print( result )

        except( self.conn.DatabaseError, Exception) as error:
            print( error )

        finally: 
            return result
    def geAllCreators(self):

        if self.conn.closed:
            self.__init__()

        sql = """

        """
    def getAllPlaylists(self):
        
        if self.conn.closed:
            self.__init__()

        sql = """
            SELECT array_to_json(
               array_agg(row_to_json(t))
            ) AS items
            FROM (
                SELECT 
                    id,
                    title, 
                    author,
                    imageurl,
                    type
                FROM playlist 
                ORDER BY upload_date DESC
                LIMIT 7
            ) t
        """

        try: 
            with self.conn.cursor() as cursor: 

                cursor.execute(sql)
                response = cursor.fetchone()[0]
                print( response )

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            return response
    def getAllTracksByPlaylistId(self, id):

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT array_to_json(
               array_agg(row_to_json(t))
            ) AS items
            FROM (
                SELECT * 
                FROM audio
                WHERE playlist_id = '%s'
            ) t
        """ %id

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                tracks = cursor.fetchall()
                print( tracks )
                
        except( self.conn.DatabseError, Exception) as error: 
            print( error )

        finally: 
            return 
    def getAuthorByAuthorId(self, id): 

        if self.conn.closed: 
            self.__init__()

        sql = """ 
            SELECT row_to_json(t)
            FROM (
            SELECT 
                    id,
                    username,
                    profileimage as imageurl
                FROM  users
                WHERE id = '%s'
        ) t """ %id

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchone()[0]
                print( result) 

        except(self.conn.DatabaseError, Exception) as error: 
            print( error )
    
        finally: 
            self.conn.close()
            return result
    def getPlaylistsByAuthorId(self, playlist):

        if self.conn.closed:
            self.__init__()

        sql = """ 
        SELECT row_to_json(t)
        FROM (
            SELECT * 
            FROM playlist
            WHERE author_id = %s
        ) t
        """ %playlist['author_id']

        # playlist['author_id'])

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchall()[0]

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            self.conn.close()
            return result
    def getPlaylistByGenre(self, genre):

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT array_to_json(
                array_agg(row_to_json(t))
            ) AS items
            FROM (
                SELECT 
                    id,
                    title, 
                    author,
                    imageurl,
                    type
                FROM playlist
                WHERE genre = '%s'    
                ORDER BY upload_date DESC
                Limit 7
            ) t
        """%genre

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                result =  cursor.fetchone()[0]
        except( self.conn.DatabaseError, Exception) as error: 
            print( error )
        
        finally: 
            return result
  
    # Media
    def getRandomTracks(self):
        
        if self.conn.closed:
            self.__init__()

        sql = """
            SELECT row_to_json(t)
            FROM (
                SELECT 
                    id,
                    author,
                    author_id,
                    imageurl,
                    contenturl
                FROM  audio
                ORDER BY RANDOM()
                LIMIT 5
            ) t
        """

        try:
            with self.conn.cursor() as cursor:
                cursor.execute( sql )
                result = cursor.fetchall()
                print( result )
        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally:
            self.conn.close()
            return result
    # Settings 
    def getAccountSettings(self, user_id):

        print( 'Retrieving user by email')
        if self.conn.closed: 
            self.__init__()

        sql = """ 
        SELECT row_to_json(t)
        FROM (
            SELECT 
                username, 
                email, 
                profileimage, 
                headerimage
            FROM users
            WHERE id = '%s'
        ) t """ %user_id

        try: 
            with self.conn.cursor() as cursor: 
                
                cursor.execute(sql)
                rows = cursor.fetchone()

                if rows is not None:
                    result = rows[0]
                    return 

                result = None

        except (self.conn.DatabaseError, Exception) as error: 
            print( '\n Error', error , '\n' )
            return error
        
        finally: 
            self.conn.close()
            return result     
    def getPaymentSettings(self, user_id):

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT row_to_json(t)
            FROM(
                SELECT  
                    credit, 
                    history
                FROM user_wallet 
                WHERE user_id = '%s'
            ) t
        """ %user_id

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                result = cursor.fetchone()[0]

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )
        return result
    def getNotificationsSettings(self, user_id):
        return
    def updateUserDetails(self, data):

        print( data )
        if self.conn.closed: 
            print( 'initializing db connectino ')
            self.__init__()
        
        sql = """
            UPDATE users
            SET username = %s,
                profileimage = %s
            WHERE id = %s
        """

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql, (data["username"], data['profileImage'], data["id"] ))
                print( cursor.statusmessage)
            
        except  (self.conn.DatabaseError, Exception) as error:
            print(error)

        finally: 
            self.conn.commit()
            return 
    def updateUserAccountSettings( self, data, id):

        if self.conn.closed:
            self.__init__()

        sql = """
            UPDATE users
            SET username = %s,
                profileimage = %s,
                headerimage = %s
            WHERE id = %s
        """

        try: 
                
            with self.conn.cursor() as cursor: 

                cursor.execute( sql, (
                    data['username'],
                    data['profileimage'],
                    data['headerimage'],
                    data['id']
                ))

                print( cursor.statusmessage )

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            self.conn.commit()
            return
    def updatUserPassword(self, id, password): 

        if self.conn.closed:
            self.conn.__init__()

        sql = """
            UPDATE security 
            SET password = %s
            WHERE user_id = e%s
        """

        try:
                
            with self.conn.cursor() as cursor:
                hashed_pw = self.bcrypt.generate_password_hash(password).decode('utf-8')
                print( hashed_pw )
                
                cursor.execute(sql, (hashed_pw, id))
                print( cursor.statusmessage)

                if cursor.statusmessage != 1: 
                    result = False
                    return

                result = True 
                self.conn.commit()
                
        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            return result 
    def upgradeUserToCreator(self, id):
        
        if self.conn.closed:
            self.__init__()
        
        sql = """
            UPDATE users
            SET accounttype = 'creator'
            WHERE id = '%s'
            RETURNING *
        """  %id

        getUser = """ 
        SELECT row_to_json(t)
        FROM (
            SELECT 
                id,
                username, 
                accounttype, 
                email, 
                profileimage, 
                headerimage
            FROM users
            WHERE id = '%s'
        ) t """ %id

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                cursor.execute(getUser)
                user = cursor.fetchone()
                print( user )

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )
        
        finally: 
            self.conn.commit()
            self.conn.close()

            return user
    def createPaymentSettings(self, user_id):

        paymentSettings = """ 
            INSERT INTO payments ( user_id)
            VALUES( '%s' )
        """ %user_id

        print( 'creating user payment settings ')
        if self.conn.closed: 
            self.__init__()

        try:
            
            with self.conn.cursor() as cursor:
                cursor.execute(paymentSettings)

        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            return error
        
        finally:
                self.conn.commit()
                self.conn.close()
                return 
        
    # LIBRARY 
    # def createUserLibrary(self, user_id):

        createLibrary = """ 
            INSERT INTO library( user_id)
            VALUES ( '%s' )
        """ %user_id

        print( 'creating user library ')
        if self.conn.closed: 
            self.__init__()

        try:
            
            print( 'creating user')
            with self.conn.cursor() as cursor:
                cursor.execute(createLibrary)
                # print( cursor.statusmessage)

        except (self.conn.DatabaseError, Exception) as error: 
            print( error )
            return error
        
        finally:
                self.conn.commit()
                self.conn.close()
                return 
    def addPaymentCredit(self, userId, ammount):

        if self.conn.closed: 
            self.__init__()

        sql = """
            UPDATE user_wallet
            SET credit = %s
            WHERE user_id = '%s'
            RETURNING *
        """ 

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql, (ammount, userId))
                print( cursor.statusmessage )
        except( self.conn.DatabaseError, Exception) as error: 
            print( error )
        
        finally: 
            return 

    # LIBRARY
    def saveItemToLibary(self, item, user_id):
        
        items = self.getSavedItems(user_id)
        
        if self.conn.closed:
            self.__init__()

        print( item )

        deleteIfExists = """
            UPDATE user_library 
            SET saved =  %s
            WHERE user_id = %s
        """
        
        insert = """
            UPDATE user_library 
            SET saved =  saved || %s
            WHERE user_id = %s
        """
        
        try: 
            with self.conn.cursor() as cursor:

                if item in items: 
                    print( ' item already saved ')
                    items = list( filter(lambda d: d.get('id') != item['id'], items))
                    print( items )
                    
                    items = json.dumps(items)
                    cursor.execute(deleteIfExists, (items, user_id))
                    print( cursor.statusmessage)
                
                else:     
                    item = json.dumps(item)
                    cursor.execute(insert, ( item, user_id))
                    print( cursor.statusmessage)

        except( Exception, self.conn.DatabaseError) as error:
            print( error )

        finally: 
            self.conn.commit()
            self.conn.close
            return
    def getSavedITemFromLibrary( self, item, user_id): 

        if( self.conn.closed):
            self.__init__()

        item_id =  item['id']

        item = json.dumps(item)
        sql = """
            SELECT jsonb_array_elements(data) 
            FROM user_library 
            WHERE user_id = '%s'
        """ %user_id

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute( sql )
                row = cursor.fetchall()
                # print( row)
                for row_item in row:
                    ( id ) = row_item[0]
                    # print( id )
                    # print( item_id)

                    if( id == item_id):
                        result = True
                        return 
                    
                    result = False

                return 
        except( self.conn.DatabaseError, Exception) as error: 
            print( error )
        finally:  
            return result
    def removeItemFromLibrary(self, item, user_id):

        if self.conn.closed: 
            self.__init__()

        # sql = """
        # UPDATE library i
        # SET    data = i2.items
        # FROM  (
        #     SELECT array_to_json(array_agg(data)) AS items
        #     FROM library lib
        #     ,    jsonb_array_elements(lib.data) AS elem
        #     WHERE  lib.data @> '{"id":"1af17e73721dbe0c40011b82ed4bb1a7dbe3ce29"}'::jsonb
        #     AND    elem->>'id' <> '1af17e73721dbe0c40011b82ed4bb1a7dbe3ce29'
        #     GROUP  BY 1
        # ) i2
        # WHERE i2.id = i.id;
        # """
        # print( item['id'])

        sql = """
            UPDATE library
            SET data = jsonb_set(data)
            FROM library
            WHERE user_id = '%s'
         """ %user_id
        

        try: 

            with self.conn.cursor() as cursor:
                cursor.execute( sql)
                print( cursor.fetchall())
                print( cursor.statusmessage )
                print( cursor.query )

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            return 
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
    def addAudioHistoryItem( self, id, user_id):

        # print( id, user_id )

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
                    # print( cursor.statusmessage )    
                    
                    return

                cursor.execute(sql, ( id, user_id))
                # print( cursor.statusmessage )
        
        except( self.conn.DatabaseError, Exception) as error: 
            print( error )
        
        finally: 
            self.conn.commit()
            self.conn.close()
            return 
    def saveAudioItem(self, user_id, id):

        if self.conn.closed:
            self.__init__()
        
        data = json.dumps(request.json)

        insert = """
            UPDATE library
            SET saved = saved || %s
            WHERE id = %s
        """ 
        
        # check_if_item_exist = """
        #     INSERT INTO saved_audio ( id, user_id, audio_id, date_created, time_created )
        #     VALUES ( DEFAULT, %s, %s, DEFAULT, DEFAULT)
        # """

        check_if_item_exist = """
            SELECT saved @> %s
            FROM users
            WHERE id = '%s'
        """ 

        try: 
            with self.conn.cursor() as cursor: 
                # cursor.execute(check_if_item_exist, (data, user_id)) 
                # result = cursor.fetchone()[0]
                # print( result )

                # print( cursor.query)
                # print( cursor.statusmessage)
                 
                # if result is not None: 
                    cursor.execute(insert, (data, user_id ))
                    print( cursor.query )
                    # print( cursor.statusmessage)
                    
                    # return 

        except(self.conn.DatabaseError, Exception) as error:
            print( 'DatabaseError', error )

        finally: 
            self.conn.commit()
            self.conn.close()
            return 
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
            print( )

        finally: 
            self.conn.close()
            return result
    def getSavedItems(self, user_id):
        if self.conn.close:
            self.__init__()
        print( 'getting saved content')
        sql = """
            SELECT saved
            FROM user_library
            WHERE user_id = '%s'
        """ %user_id

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchone()[0]
                # print( result )

        except( self.conn.DatabaseError, Exception) as error:
            print( error )

        finally: 
            return result
    def getUserPlaylists(self, user_id):
       
        if self.conn.close:
            self.__init__()

        sql = """

         SELECT array_to_json(
                array_agg(row_to_json(t))
            ) AS items
            FROM (
                SELECT * FROM user_playlist WHERE author = '%s'
            ) t
        """ %user_id

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchall()[0]
                # print( result )

        except( self.conn.DatabaseError, Exception) as error:
            print( error )

        finally: 
            return result
    def getUserHistory(self, user_id):
        
        if self.conn.close:
            self.__init__()

        sql = """
            SELECT data -> 'history'
            FROM user_library
            WHERE user_id = '%s'
        """ %user_id

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchone()[0]
                print( result )

        except( self.conn.DatabaseError, Exception) as error:
            print( error )

        finally: 
            return result
    def createNewPlaylist(self, user_id, data): 

        if self.conn.closed:
            self.__init__()

        sql = """
            INSERT INTO user_playlist ( title, author )
            VALUES ( %s, %s )
        """

        try: 
            with self.conn.cursor() as cursor: 
                print( 'Inserting into playlist library')
                cursor.execute( sql, ( data['title'], user_id,))
                print( cursor.statusmessage)
                self.conn.commit()

                cursor.execute("""
                    SELECT * 
                    FROM user_playlst
                    WHERE user_id = '%s'
                    ORDER BY date_created DESC
                """)

                print( cursor.statusmessage)

        except(self.conn.DatabaseError, Exception) as error:
            print( error )
        finally: 
            self.conn.close()
            return 
    def addItemToPlaylist(self, id, item, user_id):
        
        if self.conn.closed: 
            self.__init__()

        sql = """
            UPDATE user_playlist 
            SET items = items || %s
            WHERE id = %s
        """
        
        check_if_exists = """
            SELECT items FROM user_playlist WHERE id = '%s' 
        """ %id
        try: 
            with self.conn.cursor() as cursor:
                    
                    cursor.execute(check_if_exists)
                    items =  cursor.fetchone()[0]

                    print( items )

                    if(list(items).__len__() < 1):
                        print( 'playlist empty')
                        
                        item = json.dumps(item)
                        
                        cursor.execute(sql, (item, id))
                        print(cursor.statusmessage)
                        


                    for x in items: 
                        y =  lambda d, c: d == c
                        
                        print( item['id'])
                        print( x['id'])
                        print(y(item['id'], x['id']))

                        if y(item, x) is True:
                            return
                        
                    item = json.dumps(item)
                    
                    cursor.execute(sql, (item, id))
                    print(cursor.statusmessage)

                     
        except(self.conn.DatabaseError, Exception) as error:
            print( error)

        finally: 
            self.conn.commit()
            self.conn.close()
            return

    # Creator manager
    def getCreators(self):

        if self.conn.closed: 
            self.__init__()

        sql = """ 
            SELECT * FROM users
            INNER JOIN accounts on users.id = accounts.user_id
            WHERE user_type = 'artist'
            LIMIT 1
            RETURNING id, username, image_url
        """

        try:
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchall()
                # print( result )
        except(self.conn.DatabaseError, Exception) as error: 
            print( error)

        finally: 
            return
    def postAudioTrack(self, item):

        if self.conn.closed: 
            self.__init__()

        sql = ''' 
        INSERT INTO audio (
            title, 
            genre, 
            author_id, 
            author,

            imageurl, 
            contenturl,
            category,
            type
        )

        VALUES ( %s, %s, %s, %s, %s, %s, %s, %s)
        '''

        try: 
            with self.conn.cursor() as cursor: 
                print( item )
                cursor.execute(sql, (
                    item['title'],
                    item['genre'],
                    item['author_id'],
                    item['author'],
                    
                    item['imageurl'],
                    item['contenturl'],
                    item['category'],
                    item['type'] 
                ))
                
                self.conn.commit() 
                print( cursor.statusmessage )
                

        except ( self.conn.DatabaseError, Exception) as error:
            print( 'failt to post audio', error )

        finally:
            self.conn.close()
            return   
    def postPlaylistAudioTrack(self, item):

        if self.conn.closed: 
            self.__init__()

        sql = ''' 
        INSERT INTO audio (
            title, 
            genre, 
            author_id, 
            author,
            playlist_id,
            imageurl, 
            contenturl,
            category,
            type
        )

        VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''

        try: 
            with self.conn.cursor() as cursor: 
                print( item )
                cursor.execute(sql, (
                    item['title'],
                    item['genre'],
                    item['author_id'],
                    item['author'],
                    item['playlist_id'],
                    item['imageurl'],
                    item['contenturl'],
                    item['category'],
                    item['type'] 
                ))
                
                self.conn.commit() 
                print( cursor.statusmessage )
                

        except ( self.conn.DatabaseError, Exception) as error:
            print( 'failt to post audio', error )

        finally:
            self.conn.close()
            return   
    def postPlaylist(self, item):

        if self.conn.closed: 
            self.__init__()
        
        sql = """
            INSERT INTO playlist (title, author, author_id, imageurl, type, genre)
            VALUES(%s, %s, %s, %s, %s, %s)
            RETURNING * 
        """

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql,
                (
                    item['title'],
                    item['author'],
                    item['author_id'],
                    item['imageurl'],
                    item['type'],
                    item['genre']
                ))

                print( cursor.statusmessage)

        except( self.conn.DatabaseError, Exception) as error:
            print( error )

        finally: 
            self.conn.commit()
            self.conn.close()
            return 

    # dashboard
    def getAudioUploads(self, id):

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT array_to_json(
                array_agg(row_to_json(t))
            ) AS items
            FROM (
                SELECT * 
                FROM audio 
                WHERE author_id = '%s'
            ) t
        """ %id

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchone()[0]

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            self.conn.close()
            return result
    def getAudioUploadsByPlaylistId(self, id):

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT array_to_json(
                array_agg(row_to_json(t))
            ) AS items
            FROM (
                SELECT * 
                FROM audio 
                WHERE playlist_id = '%s'
            ) t
        """ %id

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchone()[0]

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            self.conn.close()
            return result
    def getPlaylistUploads(self, id):

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT array_to_json(
                array_agg(row_to_json(t))
            ) AS items
            FROM (
                SELECT * 
                FROM playlist 
                WHERE author_id = '%s'
            ) t
        """ %id

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                result = cursor.fetchone()[0]

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            self.conn.close()
            return result
    def getPlaylistById( self, id):

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT row_to_json(t)
            FROM (
                SELECT *
                FROM playlist
                WHERE id = '%s'
                ) t
        """%id

        try: 
            with self.conn.cursor() as cursor: 
                    cursor.execute(sql)
                    playlist = cursor.fetchone()[0]

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            return playlist
    def deletePlaylistTrackById(self, id):

        if self.conn.closed:
            self.__init__()

        sql = """
            DELETE 
            FROM audio 
            WHERE id = '%s'
        """%id

        try: 
            with self.conn.cursor() as cursor: 
                cursor.execute(sql)
                print( cursor.statusmessage)
                
        except(self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            self.conn.commit()
            self.conn.close()
            return
    # def updateAudioItemById(self, id):
        
    #     if self.
    def getItemByPlaylist_id(self, id):

        if self.conn.closed: 
            self.__init__()

        sql = """
            SELECT array_to_json(
                array_agg(row_to_json(t))
            ) AS items
            FROM (
                SELECT * 
                FROM audio 
                WHERE playlist_id = '%s'
            ) t
        """%id

        try: 
            with self.conn.cursor() as cursor:
                cursor.execute(sql)
                items = cursor.fetchone()[0]

                if( items is None): 
                    items = []

        except( self.conn.DatabaseError, Exception) as error: 
            print( error )

        finally: 
            return items