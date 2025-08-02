import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { BiSolidHeart, BiHeart } from 'react-icons/bi'
import { BsPlusCircle } from 'react-icons/bs'
import { FaPause,FaRegChartBar, FaRegEdit } from 'react-icons/fa'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { RiPlayList2Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { save } from '../utils/librarySlice'
import { play, addToQueue } from '../utils/mediaPlayerSlice'
import { AudioItemPropType } from '../utils/ObjectTypes'
import { RootState, useAppDispatch } from '../utils/store'
import { IoCloseCircleOutline } from 'react-icons/io5'

export default function PlaylistItem(props: AudioItemPropType ){

  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const library = useSelector( (state: RootState) => state.library.library)
  const [optionSlider, setOptionSlider ] = useState<boolean>(false)
  const auth = useSelector( (state: RootState) => state.auth)
  
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
    // console.log(props.playlist_id == auth.user.id)
    // console.log(props.author_id)
    // console.log(auth.user.id)
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
        {
        auth.user &&
         props.author_id == auth.user.id ? 
         <div className="track_buttons">
          {/* <button onClick={() => {}} ><FaRegChartBar/></button> */}
          <button onClick={() => {
            props.setModalForm('edit_audio')
            props.setSelectedTrack(props)
            props.setModalOpen(true)
          }} ><FaRegEdit/></button>
          <button 
            onClick={() => {
              props.setModalForm('delete_audio')
              props.setSelectedTrack(props)
              props.setModalOpen(true)
            }
          }><IoCloseCircleOutline/></button>
         </div> :
        <div className="track_buttons">
          { isSaved? <button style={{"color":"rgba(198, 161, 104,.8)"}} onClick={() => dispatch(save(audioItem))}> <BiSolidHeart/> </button> : <button onClick={() => dispatch(save(audioItem))}> <BiHeart/></button> }
          <button onClick={() => setOptionSlider(!optionSlider)} className='optionsBtn'><HiEllipsisHorizontal/></button>
        </div>

        }
        
      </div>

        {
          auth.user &&
          props.author_id == auth.user.id && 
        <div className="optionsList">
          <button onClick={() => props.openPlaylistModal(audioItem)}><BsPlusCircle/></button>
          <button onClick={(e) =>  dispatch(addToQueue(audioItem)) }><RiPlayList2Line/></button>
        </div>
        }

    </div>
  )
}