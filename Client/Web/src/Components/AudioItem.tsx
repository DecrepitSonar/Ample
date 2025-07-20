import React, { useEffect } from 'react'
import { AudioItemPropType } from '../utils/ObjectTypes'
import { replace, useNavigate } from 'react-router-dom'
import { PiPause, PiPlayBold } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../utils/store'
import { play } from '../utils/mediaPlayerSlice'
import { auth } from '../utils/Authslice'

export default function AudioItem(props: AudioItemPropType){
  
    const navigate = useNavigate()
    const player = useSelector( (state: RootState) => state.audioPlayer)
    const auth = useSelector( (state: RootState ) => state.auth)

    const dispatch = useAppDispatch()
    
    useEffect(() => {
      console.log( props)
    })

    return(
      <>
      {
        {
          "Track": 
          <div className="audio_item_container">
              <div className="audio_item_track_image_container">
                <div className="audio_item_track_image_overlay" 
                style={ player.nowPlaying.id == props.id ? { "opacity": "1"} : {}}>
                  {
                    player.nowPlaying.id == props.id ? 
                    <button className='audio_itdem_play_button'><i><PiPause/></i></button> :
                    <button className='audio_itdem_play_button' onClick={() => dispatch(play(props))}><i><PiPlayBold/></i></button>
                  }
                </div>
                <img className="audio_item_art" src={ props.id != undefined ? props.imageurl: '' }/>
              </div>
            <div className="audio_item_info">
              <span>{props.title}</span>
              <span>{props.author != undefined ? props.author : props.name }</span>
            </div>
          </div>,
          "Single": 
          <div className="audio_item_container">
              <div className="audio_item_track_image_container">
              {
                auth.user.id != props.author_id &&
                <div className="audio_item_track_image_overlay" 
                style={ player.nowPlaying.id == props.id ? { "opacity": "1"} : {}}>
                  {
                    player.nowPlaying.id == props.id ? 
                    <button className='audio_itdem_play_button'><i><PiPause/></i></button> :
                    <button className='audio_itdem_play_button' onClick={() => dispatch(play(props))}><i><PiPlayBold/></i></button>
                  }
                </div>
              }
                <img className="audio_item_art" src={ props.id != undefined ? props.imageurl : ''}/>
              </div>
            <div className="audio_item_info">
              <span>{props.title}</span>
              <span>{props.author != undefined ? props.author : props.name }</span>
              {
                auth.user.id == props.author_id &&
              <span>{props.type}</span>
              }
            </div>
          </div>,
          "Playlist":
          <div className="audio_item_container" onClick={() => 
          auth.user.id == props.author_id ? navigate(`/dashboard/edit/playlist/${props.id}`) : navigate(`/playlist/${props.id}`)
          }>
              <div className="audio_item_track_image_container">
                <img className="audio_item_art" 
                src={ props.id != undefined ? props.imageurl : '' }/>
              </div>
            <div className="audio_item_info">
              <span>{props.title}</span>
              <span>{props.author != undefined ? props.author : props.name }</span>
              {
                auth.user.id == props.author_id &&
              <span>{props.type}</span>
              }
            </div>
          </div>
        }[props.type]
      }
      </>
    )
  }
