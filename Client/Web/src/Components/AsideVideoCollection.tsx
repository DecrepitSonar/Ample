import React from "react"
import { VideoItemPropType } from "../utils/ObjectTypes"

export default function AsideVideoCollection(props: VideoItemPropType){
    return(
      
      <div className="video_collection_container">
        <div className="small_video_item_container">
          <img className="small_video_item_poster" src={`https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
          <div className="small_video_item_detail_container">
            <span>{props.title}</span>
            <span>{props.author}</span>
            <span>{props.views} Views</span>
          </div>
        </div>

      </div>
    )
  }