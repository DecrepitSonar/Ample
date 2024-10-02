import React from 'react'
import { useNavigate } from 'react-router-dom'
import { VideoItemPropType } from '../utils/ObjectTypes'


export default function VideoItem(props: VideoItemPropType){
    const navigate = useNavigate()
  
    return(
      <div className="video_item_container" onClick={() => navigate('/video')}>
        <div className="video_item_poster"
          style={{"backgroundImage": `url(https://prophile.nyc3.digitaloceanspaces.com/images/${props.posterURL}.jpg)`}}
        />
        <div className="video_item_info_container">
          <div className="video_item_author_avi"
            style={{"backgroundImage":`url(https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${props.imageURL}.jpg)`}}
          />
          <div className="video_item_info">
          <span>{props.title}</span>
          <span>{props.author}</span>
          <span>{props.views} views</span>
          </div>
  
        </div>
      </div>
    )
  }