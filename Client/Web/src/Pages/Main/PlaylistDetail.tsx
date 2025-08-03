import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { BiHeart, BiSolidHeart } from 'react-icons/bi'
import { FaPause, FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import UserAvi from '../../Components/UserAvi'
import { AudioItemPropType, PlaylistPageDataType, UserAviPropType, } from '../../utils/ObjectTypes'
import VideoItem from '../../Components/VideoItem'
import AudioItem from '../../Components/AudioItem'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addToQueue, play, addToPlayNext, togglePlayer } from '../../utils/mediaPlayerSlice'
import { RootState, useAppDispatch } from '../../utils/store'
import { RiPlayList2Line } from 'react-icons/ri'
import { save } from '../../utils/librarySlice'
import { BsPlusCircle } from 'react-icons/bs'
import PlaylistItem from '../../Components/PlaylistItem'
import httpclient from '../../httpclient'
import PurchaseModal from '../../Components/PurchaseModal'
import PlaylistsOptionsModal from '../../Components/PlaylistsOptionsModal'
import PlaylistModal from '../../Components/ PlaylistModal'


// const PlaylistTrackItem = (props: AudioItemPropType) => {
//   const library = useSelector( (state: RootState) => state.library.library)
//   const [isSaved, setSaved ] = useState<Boolean>(library != undefined ? library.find(_ => _.id == props.id) != undefined : false)
  
//   return(
    
//   )
// }


export default function PlaylistDetail() {

  const [playListITem, setPlayyListItem ] = useState<PlaylistPageDataType>()

  const params = useParams()
  const dispatch = useAppDispatch()

  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const library = useSelector( (state: RootState) => state.library.library)

  const [ currentModal, setCurrentModal ] = useState('')
  const [playlistModalOpen, setPlaylistModalOpen ] =useState<boolean>(false)
  const [purchaseModalOpen, setPurchaseModalOpen ] =useState<boolean>(false)
  const [ audioItem, setAudioItem ] = useState<AudioItemPropType>()

  const openPlaylistModal = (item: AudioItemPropType) => {
    setPlaylistModalOpen(true)
    setAudioItem(item)
    setCurrentModal('Playlist')
    console.log( 'open')
  }

  const openPurchaseModal = ( item: AudioItemPropType ) => {
    setPurchaseModalOpen(true)
  }

  useEffect(() => {
    httpclient.get(`http://127.0.0.1:5000/playlist?id=${params.id}`)
    .then( response => {
      setPlayyListItem(response.data)
    })

    console.log( audioPlayer )

  },[params])

  const isSaved = (item) => {
    console.log( item )
    return library != undefined ? library.find(_ => _.id == item.id) != undefined : false
 }

  return ( 
    <div className='page_container'>
        <div className="playlist_header">
          <div className="playlist_header" 
               style={{backgroundImage: `url(${playListITem?.head.playlist.imageurl})`}}>
            <div className="playlist_header_overlay">
              <div className="playlist_header_item_container">
              <div className="header_playlist_image" style={{backgroundImage: `url(${playListITem?.head.playlist.imageurl})`}}/>
                
              </div>
              <div className="header_playlist_detail">
              <div className="header_playlist_author_detail_container">
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
                     dispatch(togglePlayer(null))
                  }
                  dispatch(togglePlayer(null))
                }}>
                {audioPlayer.nowPlaying.playlist_id == playListITem?.head.playlist.id && audioPlayer.player.isPlaying ? <FaPauseCircle/>: <FaPlayCircle/>} 
              </button>
              { 
                playListITem != undefined &&
                isSaved(playListITem.head.playlist) ? 
                  <button style={{"color":"rgba(198, 161, 104,.8)"}} onClick={() => dispatch(save(playListITem.head.playlist))}> <BiSolidHeart/> </button> : 
                  <button onClick={() => dispatch(save(playListITem!.head.playlist))}> <BiHeart/></button> 
              }
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
                                    key={count} 
                                    item={item as AudioItemPropType}
                                    index={count} 
                                    openPurchaseModal={openPurchaseModal}
                                    openPlaylistModal={openPlaylistModal}
                          />
                        } )
                      }
                    </div> : <></>
                 }
          {
            playListITem?.head.author &&
            <section>
              <h1 className="section_subheading">Author</h1>
              <div className="h_list"> <UserAvi {...playListITem.head.author}/></div>
            </section> 
          }
          {
            playListITem?.features &&
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

          }
          {
            playListITem?.albums ? 
            <section>
              <h1 className="section_subheading">Albums from { playListITem.head.playlist.author}</h1>
              <div className="h_list">
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
            // playListITem?.relatedVideos.length > 0 && 

            // <section>
            // <span className="section_subheading">Videos from {playListITem?.head.author.username}</span>
            // <div className="playlist_section_item_container">
            //     {
            //       playListITem.relatedVideos.map( video => {
            //           return <VideoItem {...video}/>
            //       })  
            //     }
            // </div>
            // </section> 
          }
              
        </div>
        {/* <PurchaseModal purchaseModalOpen={purchaseModalOpen}/> */}
        <PlaylistModal 
        playlistModalOpen={playlistModalOpen}
        setCurrentModal={setCurrentModal}
        currentModal={currentModal}
        setPlaylistModalOpen={setPlaylistModalOpen}
        audioItem={audioItem as AudioItemPropType}
        /> 
    </div>
  )
}
