import React from 'react'
import { AudioItemPropType } from '../utils/ObjectTypes'
import { useNavigate } from 'react-router-dom'

export default function AudioItem(props: AudioItemPropType){
  
    const navigate = useNavigate()
  
    return(
      <div className="audio_item_container" onClick={() => navigate("/playlist/0")}>
        <div className="audio_item_art"
        style={{"backgroundImage": `url(https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg)`}}
        />
        <div className="audio_item_info">
          <span>{props.title}</span>
          <span>{props.author}</span>
        </div>
      </div>
    )
  }
