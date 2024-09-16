import React from 'react'
import { AudioItemPropType } from '../utils/ObjectTypes'
import { useNavigate } from 'react-router-dom'

export default function AudioItem(props: AudioItemPropType){
  
    const navigate = useNavigate()
  
    return(
      <div className="audio_item_container" onClick={() => navigate("/audio")}>
        <div className="audio_item_art"
        style={{"backgroundImage": `url(${props.imageURL})`}}
        />
        <div className="audio_item_info">
          <span>{props.title}</span>
          <span>{props.author}</span>
        </div>
      </div>
    )
  }
