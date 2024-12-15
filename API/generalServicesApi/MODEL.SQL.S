
-- --- USERS 
-- id varchar(255) not null PRIMARY KEY 
-- type varchar(255) not null
-- username varchar(255) not null
-- imageurl varchar(255) not null
-- isverified bool DEFAULT false
-- joindate date DEFAULT current_timestamp
-- accountsettings varchar(255) not null unique
-- session varchar(255) not null
-- CONSTRAINT accountsettings foreignkey ( accountsettings) REFERENCES useraccountsettings(id)
-- CONSTRAINT session  foreignkey (session) REFERENCES usersessions (id )

-- --- users settings
-- id  varchar(255) not null PRIMARY KEY
-- userid varchar(255) not null unique
-- email varchar(255) not null 
-- headerposterurl varchar(255) not null
-- password varchar(255) not null
-- CONSTRAINT userid foreignkey(userid) REFERENCES users(id)

-- --- user sessions
-- id varchar(255) not null PRIMARY KEY 
-- userId varchar(255) not null
-- sessionkey varchar(255) not null 
-- constraint usersession foreignkey ( userId) REFERENCES users( id )

-- --- Playlist
-- id varchar(255) not null PRIMARY KEY
-- title varchar(255) not null 
-- authorid varchar(255) not null
-- CONSTRAINT authorid foreignkey(authorid) REFERENCES users(id)
-- releasedate varchar(255) not null 
-- imageurl varchar(255) not null 
-- genre varchar(255) not null 

-- --- Track
-- id varchar(255) not null PRIMARY KEY 
-- tracknum integer not null
-- genre varchar(255) not null
-- title varchar(255) not null 
-- playlistid varchar(255) not null
-- CONSTRAINT playlistid foreignkey(albumid) REFERENCES playlist(id)
-- authorid varchar(255) not null
-- CONSTRAINT authorid foreignkey(authorid) REFERENCES users(id)
-- playcount integer DEFAULT 0
-- audiocontenttype varchar(255) not null

-- --- Video
-- id varchar(255) not null PRIMARY KEY
-- videourl varchar(255) not null 
-- title varchar(255) not null 
-- artistid varchar(255) not null 
-- views integer DEFAULT 0
-- videoType varchar(255) not null
-- videoimage varchar(255) not null 
-- releasedate date default current_timestamp


-- User
id uuid NOT NULL UNIQUE PRIMARY DEFAULT uuid_genreate( v1 ),
join_date Date DEFAULT current_timestamp
user_type VARCHAR(255) NOT NULL DEFAULT 'USER'

-- Account
id uuid NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate( v1 ),
username VARCHAR(255) NOT NULL UNIQUE,
avi_image_url VARCHAR(255) NOT NULL DEFAULT 'DEFAULT IMAGE URL',
email VARCHAR(255) NOT NULL UNIQUE,
header_image VARCHAR(255) NOT NULL DEFAULT 'DEFAULT IMAGE URL',
verified BOOLEAN DEFAULT false
user_id uuid NOT NULL,
CONSTRAINT user_id FOREIGN KEY( user_id ) REFERENCES user( id )

-- Session 
id uuid NOT NULL DEFAULT uuid_generate( v1 ) UNIQUE PRIMARY
session_key VARCHAR(255)
user_id VARCHAR(255) NOT NULL UNIQUE
CONSTRAINT user_id FOREIGN KEY ( user_id ) REFERENCES user( id )

-- Video
id uuid UNIQUE PRIMARY KEY DEFAULT uuid_generate( v1 ),
title VARCHAR(255) NOT NULL, 
author VARCHAR(255) NOT NULL, 
views INTEGER NOT NULL DEFAULT 0,
video_type VARCHAR(255) NOT NULL DEFAULT 'Video',
thumbnail_url VARCHAR(255) NOT NULL DEFAULT '',
release_date VARCHAR(255) NOT NULL DEFAULT current_timestamp,

-- Audio
id uuid UNIQUE PRIMARY KEY DEFAULT uuid_generate( v1 ),
title VARCHAR(255) NOT NULL, 
author VARCHAR(255) NOT NULL, 
streams INTEGER NOT NULL DEFAULT 0,
audio_type VARCHAR(255) NOT NULL DEFAULT 'Track',
cover_image VARCHAR(255) NOT NULL DEFAULT '',
release_date VARCHAR(255) NOT NULL DEFAULT current_timestamp,

-- Playlist
id uuid UNIQUE PRIMARY DEFAULT uuid_generate( v1 ), 
title VARCHAR(255) NOT NULL,
cover_image VARCHAR(255) NOT NULL DEFAULT '',
genre VARCHAR(255) NOT NULL,
create_date VARCHAR(255) NOT NULL DEFAULT current_timestamp,
is_private BOOLEAN DEFAULT false
author_id VARCHAR(255) NOT NULL, 
CONSTRAINT author_id FOREIGN KEY ( author_id ) REFERENCES user( id )

-- Saved Playlist
id uuid NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate( v1 ), 
playlist_id uuid NOT NULL,
CONSTRAINT playlist_id FOREIGN KEY ( playlist_id ) REFERENCES playlist( id )
author_id uuid NOT NULL, 
CONSTRAINT author_id FOREIGN KEY ( author_id ) REFERENCES user( id ),

-- Video Playlist
id uuid UNIQUE PRIMARY KEY DEFAULT uuid_generate( v1 ), 
title VARCHAR(255) NOT NULL, 
author_id uuid NOT NULL, 
video_id uuid NOT NULL, 
create_date Date NOT NULL DEFAULT current_timestamp,
CONSTRAINT author_id FOREIGN KEU ( author_id ) REFERENCES user( id ),
CONSTRAINT video_id FOREIGN KEY ( video_id ) REFERENCES video( id )

-- Audio Playlsit
id uuid NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate( v1 ), 
author_id uuid NOT NULL, 
audio_id uuid NOT NULL, 
create_date NOT NULL DEFAULT current_timestamp,
CONSTRAINT author_id FOREIGN KEY ( author_id ) REFERENCES user( id ),
CONSTRAINT audio+id FOREIGN KEY ( audio_id ) REFERENCES audio( id )

-- Saved Audio
id uuid NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate( v1 ), 
author_id uuid NOT NULL, 
audio_id uuid nOT NULL, 
CONSTRAINT author_id FOREIGN KEY ( author_id ) REFERENCES user( id ),
CONSTRAINT audio_id FOREIGN KEY ( audio_id ) REFERENCES audio( id )

-- Saved Video
id uuid NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate( v1 ), 
author_id uuid NOT NULL, 
video_id uuid nOT NULL, 
CONSTRAINT author_id FOREIGN KEY ( author_id ) REFERENCES user( id ),
CONSTRAINT video_id FOREIGN KEY ( video_id ) REFERENCES video( id )