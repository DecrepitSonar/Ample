import React from "react"
import { AudioListItemPropType } from "../utils/ObjectTypes"

export default function AudioListItem(props: AudioListItemPropType){
    return(
    <div className="audio_list_item_container">
      <img className="audio_list_item_image" src={`https://prophile.nyc3.cdn.digitaloceanspaces.com/images/'${props.imageURL}.jpg`}/>
      <div className="audio_list_item_info">
        <span>{props.title}</span>
        <span>{props.name}</span>
      </div>
    </div>
    )
  }