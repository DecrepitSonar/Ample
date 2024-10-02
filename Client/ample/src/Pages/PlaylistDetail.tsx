import React, { useEffect, useState } from 'react'
import '../styles/playlistStyles.css'
import { BsHeartFill, BsPlayBtnFill } from 'react-icons/bs'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { BiHeart } from 'react-icons/bi'
import { FaPlayCircle } from 'react-icons/fa'
import UserAvi from '../Components/UserAvi'
import { AudioItemPropType, UserAviPropType, VideoItemPropType } from '../utils/ObjectTypes'
import VideoItem from '../Components/VideoItem'
import AudioItem from '../Components/AudioItem'
import axios from 'axios'
import { ScrollRestoration, useParams } from 'react-router-dom'

type TrackPropType = {
  trackNum: number,
  title: String,
  author: String
}
function PlaylistItem(props: TrackPropType){
  return(
    <div className="playlist_item_container">
      
      <div className="track_item_container">
        <span className='track_numner'>{props.trackNum + 1}</span>
        <div className="track_item_detail">
          <span>{props.title}</span>
          <span>{props.author}</span>
        </div>
      </div>
      <div className="track_buttons">
        <button><BiHeart/></button>
        <button><HiEllipsisHorizontal/></button>
      </div>
    </div>
  )
}

type PlaylistPageDataType = {
  head: {
    playlist: AudioItemPropType,
    tracks: [TrackPropType],
    author: UserAviPropType
  },
  features: [UserAviPropType],
  recommendations: [AudioItemPropType],
  relatedFetures: [AudioItemPropType],
  relatedVideos: [VideoItemPropType]
}

export default function PlaylistDetail() {

  const [playListITem, setPlayyListItem ] = useState<PlaylistPageDataType>()
  const params = useParams()

  useEffect(() => {

    document.body.scrollTo(0, 0); 

    axios.get(`http://127.0.0.1:5000/playlist?id=${params.id}`)
    .then( response => {
      setPlayyListItem(response.data)
      console.log( response.data.head )
    })
  },[])
  const users = [
    {
      username: 'Anderson .Paak',
      imageURL: 'andersonpaak.jpg'
    },
    {
      username: 'Anderson .Paak',
      imageURL: 'andersonpaak.jpg'
    },
    {
      username: 'Anderson .Paak',
      imageURL: 'andersonpaak.jpg'
    },
    {
      username: 'Anderson .Paak',
      imageURL: 'andersonpaak.jpg'
    }
  ]
  const tracks = [
    {
      title: 'ThankU (feat. Dave Chappelle )',
      author: 'NxWorries, Anderson . Paak, knxwledge, Dave Chappelle'
    },
    {
      title: "86Senatra",
      author: 'NxWorries, Anderson . Paak, knxwledge,'
    },
    {
      title: "86Senatra",
      author: 'NxWorries, Anderson . Paak, knxwledge,'
    },
    {
      title: "86Senatra",
      author: 'NxWorries, Anderson . Paak, knxwledge,'
    },
    {
      title: "86Senatra",
      author: 'NxWorries, Anderson . Paak, knxwledge,'
    },
    {
      title: "86Senatra",
      author: 'NxWorries, Anderson . Paak, knxwledge,'
    },
    {
      title: "86Senatra",
      author: 'NxWorries, Anderson . Paak, knxwledge,'
    },
    {
      title: "86Senatra",
      author: 'NxWorries, Anderson . Paak, knxwledge,'
    },
    {
      title: "86Senatra",
      author: 'NxWorries, Anderson . Paak, knxwledge,'
    },
    {
      title: "86Senatra",
      author: 'NxWorries, Anderson . Paak, knxwledge,'
    },
  ]

  const Videos = [
    {
      "title": "Alternate Ending - Episode 606",
      "author": "The Joe Budden Podcast",
      "posterURL": "../alternateending.jpg",
      "imageURL": "../jbp.jpg",
      "views": 12313
    },
    {
      "title": "Gridtz and Cornbread",
      "author": "The Brilliant Idiot Podcast",
      "posterURL": "../gritzandcornbread.jpg",
      "imageURL": "../brilliantidiots.jpg",
      "views": 12313
    }
    ,
    {
      "title": "Day Walker | Episode 10",
      "author": "Rory & Mal Podcast",
      "posterURL": "../daywalker.jpg",
      "imageURL": "../rorynmal.jpg",
      "views": 12313
    },
  ]

  const AudioItems = [
    {
      "title": "Dark Times",
      "author": "Vince Staples",
      "imageURL": "../darktimes.jpg"
    },
    {
      "title": "Tyla",
      "author": "Tyla",
      "imageURL": "../tyla.jpg"
    },
    {
      "title": "Talk Memory",
      "author": "BADBADNOTGOOD",
      "imageURL": "../Bbngtalkmemory.jpg"
    },
    {
      "title": "Yes Lawd",
      "author": "NxWorries",
      "imageURL": "../yeslawd.jpg"
    },
    {
      "title": "Why Lawd",
      "author": "Anderson .Paak",
      "imageURL": "../whylawd.jpg"
    }
  ]
  return ( 
    <div className='page_container'>
        <div className="playlist_header">
          <div className="playlist_header" 
               style={{backgroundImage: `url(https://prophile.nyc3.digitaloceanspaces.com/images/${playListITem?.head.playlist.imageURL}.jpg)`}}>
            <div className="playlist_header_overlay">
              <div className="playlist_header_item_container">
              <div className="header_playlist_image" style={{backgroundImage: `url(https://prophile.nyc3.digitaloceanspaces.com/images/${playListITem?.head.playlist.imageURL}.jpg)`}}/>
                <div className="header_playlist_track_list">
                  {
                    playListITem?.head.tracks.map( (item, count) =>{
                      return <PlaylistItem key={count} trackNum={count} {...item}/>
                    } )
                  }
                </div>
              </div>
              <div className="header_playlist_detail">
              <div className="header_playlist_author_detail_container">
                {/* <div className="header_playlist_author_image" style={{backgroundImage: `url(https://prophile.nyc3.digitaloceanspaces.com/images/${playListITem?.head.author.imageURL}.jpg`}}/> */}
                <div className="header_playlist_author_detail">
                    <span>{playListITem?.head.playlist.title}</span>
                    <span>{playListITem?.head.playlist.author}</span>
                </div>
              </div>
            <div className="header_playlist_buttons">
              <button><FaPlayCircle/></button>
              <button><BiHeart/></button>
              <button><HiEllipsisHorizontal/></button>
            </div>
          </div>
            </div>
          </div>          
          </div>
        <div className="playlist_body_container">
        
          {
            playListITem?.features ?
            <section>
              <span className="section_subheading">Featured</span>
              <div className="playlist_section_item_container">
                  {
                      playListITem.features.map( (user: UserAviPropType)  => {
                          return <UserAvi {...user}/>
                      })
                      
                  }
              </div>
            </section> 
            : <></>

          }
          {
            playListITem?.recommendations ? 
            <section>
              <span className="section_subheading">You may also like</span>
              <div className="playlist_section_item_container">
                {
                  playListITem.recommendations.map( item => {
                      return <AudioItem {...item}/>
                  })
                }
              </div>
            </section> : null
          }
          {
            playListITem?.relatedFetures ? 
            <section>
            <span className="section_subheading">Fetured in</span>
            <div className="playlist_section_item_container">
              {
                playListITem.relatedFetures.map( item => {
                    return <AudioItem {...item}/>
                })
                
              }
            </div>
            </section> : null
          }
          {
            playListITem?.relatedVideos ? 

            <section>
            <span className="section_subheading">Videos from {playListITem?.head.author.username}</span>
            <div className="playlist_section_item_container">
                {
                  playListITem.relatedVideos.map( video => {
                      return <VideoItem {...video}/>
                  })  
                }
            </div>
            </section> : null
          }
              
        </div>
    </div>
  )
}
