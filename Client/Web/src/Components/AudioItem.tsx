import React, { useEffect } from 'react'
import { AudioItemPropType } from '../utils/ObjectTypes'
import { replace, useNavigate } from 'react-router-dom'

export default function AudioItem(props: AudioItemPropType){
  
    const navigate = useNavigate()

    useEffect(() => {
      if( props.author == undefined ){
      }
    })
    return(
      <div className="audio_item_container" onClick={() => navigate(`/playlist/${props.id}`)}>
        <div className="audio_item_art"
        style={{"backgroundImage": props.id != undefined ? `url(https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg)` : `url(${props.imageURL})`}}
        />
        <div className="audio_item_info">
          <span>{props.title}</span>
          <span>{props.author != undefined ? props.author : props.name }</span>
          <span>{props.author != undefined && props.type }</span>
        </div>
      </div>
    )
  }
