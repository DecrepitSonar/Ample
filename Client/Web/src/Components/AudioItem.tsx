import React, { useEffect } from 'react'
import { AudioItemPropType } from '../utils/ObjectTypes'
import { replace, useNavigate } from 'react-router-dom'
import { PiPause, PiPlayBold } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../utils/store'
import { play } from '../utils/mediaPlayerSlice'
export default function AudioItem(props: AudioItemPropType){
  
    const navigate = useNavigate()
    const player = useSelector( (state: RootState) => state.audioPlayer)
    const dispatch = useAppDispatch()

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
                <img className="audio_item_art" src={ props.id != undefined && `https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
              </div>
            <div className="audio_item_info">
              <span>{props.title}</span>
              <span>{props.author != undefined ? props.author : props.name }</span>
            </div>
          </div>,
          "Album":
          <div claassName="audio_item_container" onClick={() => navigate(`/playlist/${props.id}`)}>
              <div className="audio_item_track_image_container">
                <img className="audio_item_art" src={ props.id != undefined && `https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
              </div>
            <div className="audio_item_info">
              <span>{props.title}</span>
              <span>{props.author != undefined ? props.author : props.name }</span>
            </div>
          </div>
        }[props.type]
      }
      </>
    )
  }
