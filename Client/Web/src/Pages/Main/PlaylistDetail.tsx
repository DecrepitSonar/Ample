import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { BiHeart, BiSolidHeart } from 'react-icons/bi'
import { FaPause, FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import UserAvi from '../../Components/UserAvi'
import { AudioItemPropType, UserAviPropType, VideoItemPropType } from '../../utils/ObjectTypes'
import VideoItem from '../../Components/VideoItem'
import AudioItem from '../../Components/AudioItem'
import axios from 'axios'
import { Link, OutletProps, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addToQueue, next, play, addToPlayNext, togglePlayer } from '../../utils/mediaPlayerSlice'
import { RootState, useAppDispatch } from '../../utils/store'
import { RiPlayList2Line } from 'react-icons/ri'
import httpclient from '../../httpclient'
import { save } from '../../utils/librarySlice'
import { CgAdd } from 'react-icons/cg'
import { BsPlusCircle } from 'react-icons/bs'

type TrackPropType = {
  id: string, 
  trackNum: number,
  title: String,
  author: String
}
function PlaylistItem(props: AudioItemPropType ){

  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const library = useSelector( (state: RootState) => state.library.library)
  const [optionSlider, setOptionSlider ] = useState<boolean>(false)
  
  // const [isSaved, setSaved ] = useState<Boolean>(false)
  const audioItem = props as AudioItemPropType

  const isSaved  = library != undefined ? library.find(_ => _.id == audioItem.id) != undefined : false
  const dispatch = useAppDispatch()
  
  const activeTrackStyle = {
    backgroundColor: 'rgba(198, 161, 104,.2)',
  }

  const sliderOpen = {
    width: '92%'
  }

  useEffect(() => {
    // setSaved(  )
  },[library])

  return(
    <div className="playlist_item_container" onMouseLeave={() => setOptionSlider(false)}
    style={audioPlayer.nowPlaying.id == audioItem.id ? activeTrackStyle : {}}>
      
      <div className="track_item_container" 
      style={optionSlider ? sliderOpen : {}}
      >
        
        <div className='track_item'
        onClick={() => {dispatch(play(audioItem))}}
        >
          {audioPlayer.nowPlaying.id == audioItem.id && audioPlayer.player.isPlaying ? <><span className='track_numner'>{audioItem.trackNum + 1} </span> <button style={{'color': 'rgba(198, 161, 104,1)' }}><FaPause/></button> </>: <span className='track_numner'>{audioItem.trackNum + 1} </span>}
          <div className="track_item_detail">
            <span>{audioItem.title}</span>
            <span>{audioItem.author}</span>
          </div>
        </div>

        <div className="track_buttons">
          { isSaved? <button style={{"color":"rgba(198, 161, 104,.8)"}} onClick={() => dispatch(save(audioItem))}> <BiSolidHeart/> </button> : <button onClick={() => dispatch(save(audioItem))}> <BiHeart/></button> }
          <button onClick={() => setOptionSlider(!optionSlider)} className='optionsBtn'><HiEllipsisHorizontal/></button>
        </div>
        
      </div>

        <div className="optionsList">
          <button onClick={(e) =>  dispatch(addToQueue(audioItem)) }><RiPlayList2Line/></button>
          <button onClick={() => props.openPlaylistModal(audioItem)}><BsPlusCircle/></button>
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

// const PlaylistTrackItem = (props: AudioItemPropType) => {
//   const library = useSelector( (state: RootState) => state.library.library)
//   const [isSaved, setSaved ] = useState<Boolean>(library != undefined ? library.find(_ => _.id == props.id) != undefined : false)
  
//   return(
    
//   )
// }

type ModalOutletProps = {
  openPlaylistModal: ( item: AudioItemPropType ) => void 
  playlistModalOpen:Boolean 
  setPlaylistModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PlaylistDetail() {

  const { openPlaylistModal } = useOutletContext<ModalOutletProps>()

  const [playListITem, setPlayyListItem ] = useState<PlaylistPageDataType>()
  const params = useParams()
  const dispatch = useAppDispatch()

  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const library = useSelector( (state: RootState) => state.library.library)

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/playlist?id=${params.id}`)
    .then( response => {
      setPlayyListItem(response.data)
      console.log( response.data.head )
    })

  },[params])

  const isSaved = (item) => {
    console.log( item )
    return library != undefined ? library.find(_ => _.id == item.id) != undefined : false
 }

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
              { 
                playListITem != undefined &&
                  isSaved(playListITem.head.playlist) ? 
                  <button style={{"color":"rgba(198, 161, 104,.8)"}} onClick={() => dispatch(save(playListITem.head.playlist))}> <BiSolidHeart/> </button> : 
                  <button onClick={() => dispatch(save(playListITem.head.playlist))}> <BiHeart/></button> }
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
                          return <PlaylistItem 
                                    openPlaylistModal={openPlaylistModal}
                                    isSaved={isSaved(item)} 
                                    key={count} 
                                    trackNum={count} 
                                    {...item}/>
                        } )
                      }
                    </div> : <></>
                 }
          {
            playListITem?.features ?
            <section>
              <h1 className="section_subheading">Featured</h1>
              <div className="h_list">
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
              <h1 className="section_subheading">Albums from { playListITem.head.playlist.author}</h1>
              <div className="h_list">
                { 
                  playListITem.albums.map( (item, count) => {
                      return <AudioItem open key={count} {...item}/>
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
