import React, { useEffect, useState } from 'react'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { BiHeart, BiSolidHeart } from 'react-icons/bi'
import { FaPause, FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import UserAvi from '../../Components/UserAvi'
import { AudioItemPropType, UserAviPropType, VideoItemPropType } from '../../utils/ObjectTypes'
import VideoItem from '../../Components/VideoItem'
import AudioItem from '../../Components/AudioItem'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addToQueue, next, play, addToPlayNext, save, togglePlayer } from '../../utils/mediaPlayerSlice'
import { RootState, useAppDispatch } from '../../utils/store'
import { RiPlayList2Line } from 'react-icons/ri'
import httpclient from '../../httpclient'

type TrackPropType = {
  id: string, 
  trackNum: number,
  title: String,
  author: String
}
function PlaylistItem(props: TrackPropType){

  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const library = useSelector( (state: RootState) => state.library.library
)
  const dispatch = useAppDispatch()
  const isSaved = () => {
    return library != null ?   library.find(item => item.id == props.id) != undefined : false
  }
  const activeTrackStyle = {
    backgroundColor: 'rgba(198, 161, 104,.2)',
  }
  return(
    <div className="playlist_item_container"
    style={audioPlayer.nowPlaying.id == props.id ? activeTrackStyle : {}}>
      
      <div className="track_item_container" onClick={() => {dispatch(play(props))}}>
      {audioPlayer.nowPlaying.id == props.id && audioPlayer.player.isPlaying ? <><span className='track_numner'>{props.trackNum + 1} </span> <button style={{'color': 'rgba(198, 161, 104,1)' }}><FaPause/></button> </>: <span className='track_numner'>{props.trackNum + 1} </span>
       }
        <div className="track_item_detail">
          <span>{props.title}</span>
          <span>{props.author}</span>
        </div>
      </div>
      <div className="track_buttons">
        { isSaved() ? <button style={{"color":"rgba(198, 161, 104,.8)"}} onClick={() => dispatch(save(props))}> <BiSolidHeart/> </button> : <button onClick={() => dispatch(save(props))}> <BiHeart/></button> }
        <button onClick={(e) =>  dispatch(addToQueue(props)) }><RiPlayList2Line/></button>
        <button className='optionsBtn'><HiEllipsisHorizontal/></button>
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
  albums: [AudioItemPropType],
  recommendations: [AudioItemPropType],
  relatedFetures: [AudioItemPropType],
  relatedVideos: [VideoItemPropType]
}

export default function PlaylistDetail() {

  const [playListITem, setPlayyListItem ] = useState<PlaylistPageDataType>()
  const params = useParams()
  const dispatch = useAppDispatch()

  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/playlist?id=${params.id}`)
    .then( response => {
      setPlayyListItem(response.data)
      console.log( response.data.head )
    })

  },[params])

  return ( 
    <div className='page_container'>
        <div className="playlist_header">
          <div className="playlist_header" 
               style={{backgroundImage: `url(https://prophile.nyc3.digitaloceanspaces.com/images/${playListITem?.head.playlist.imageURL}.jpg)`}}>
            <div className="playlist_header_overlay">
              <div className="playlist_header_item_container">
              <div className="header_playlist_image" style={{backgroundImage: `url(https://prophile.nyc3.digitaloceanspaces.com/images/${playListITem?.head.playlist.imageURL}.jpg)`}}/>
                
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
              <button 
                onClick={() => {
                  if( audioPlayer.nowPlaying.albumId != playListITem?.head.playlist.id ){
                     dispatch(addToPlayNext(playListITem?.head.tracks))
                    }
                  dispatch(togglePlayer(null))
                }}>
                {audioPlayer.nowPlaying.albumId == playListITem?.head.playlist.id && audioPlayer.player.isPlaying ? <FaPauseCircle/>: <FaPlayCircle/>} 
              </button>
              <button><BiHeart/></button>
              <button onClick={(() => dispatch(addToQueue(playListITem?.head.tracks)))}><RiPlayList2Line/></button>
              <button><HiEllipsisHorizontal/></button>
            </div>
          </div>
            </div>
          </div>          
          </div>
        <div className="playlist_body_container">
        

                { 
                  playListITem != undefined  && playListITem.head.tracks.length > 0 ? 
                    <div className="header_playlist_track_list">
                      <div className="trackSectionHeader">
                        <span className="section_subheading">Tracks</span>
                        <span className="section_subheading">{playListITem.head.tracks.length} Tracks</span>
                      </div>
                      {
                        playListITem?.head.tracks.map( (item, count) =>{
                          return <PlaylistItem key={count} trackNum={count} {...item}/>
                        } )
                      }
                    </div> : <></>
                 }
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
            playListITem?.albums ? 
            <section>
              <span className="section_subheading">Albums from { playListITem.head.playlist.author}</span>
              <div className="playlist_section_item_container">
                { 
                  playListITem.albums.map( (item, count) => {
                      return <AudioItem key={count} {...item}/>
                  })
                }
              </div>
            </section> : null
          }
          {
            playListITem?.relatedFetures &&
            <section>
            <span className="section_subheading">Fetured in</span>
            <div className="playlist_section_item_container">
              {
                playListITem.relatedFetures.map( item => {
                    return <AudioItem {...item}/>
                })
                
              }
            </div>
            </section>
          }
          {
            playListITem?.relatedVideos.length > 0 && 

            <section>
            <span className="section_subheading">Videos from {playListITem?.head.author.username}</span>
            <div className="playlist_section_item_container">
                {
                  playListITem.relatedVideos.map( video => {
                      return <VideoItem {...video}/>
                  })  
                }
            </div>
            </section> 
          }
              
        </div>
    </div>
  )
}
