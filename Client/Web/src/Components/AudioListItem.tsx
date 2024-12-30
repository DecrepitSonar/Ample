import React from "react"
import { AudioItemPropType, AudioListItemPropType } from "../utils/ObjectTypes"
import { play } from "../utils/mediaPlayerSlice"
import { useAppDispatch } from "../utils/store"

export default function AudioListItem(props: AudioListItemPropType){

  const dispatch = useAppDispatch() 

    return(
    <div className="audio_list_item_container" onClick={() => dispatch( play(props))}>
      <img className="audio_list_item_image" src={`https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
      <div className="audio_list_item_info">
        <span>{props.title}</span>
        <span>{props.author}</span>
      </div>
    </div>
    )
  }