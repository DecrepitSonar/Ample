import React from "react"
import { AppDispatch, useAppDispatch } from "../utils/store"
import { AudioListItemPropType } from "../utils/ObjectTypes"
import { HiEllipsisHorizontal } from "react-icons/hi2"
import { play } from "../utils/mediaPlayerSlice"

export default function TrackStrip(props: AudioListItemPropType){
    const dispatch = useAppDispatch()

    return(
        <div className='small_list_item_container' onClick={() => dispatch(play(props))}>
            <img className='small_list_item_image' src={`https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
            <div className='small_list_item_detail_container'>
                <span>{props.title}</span>
                <span>{props.name}</span>
            </div>
            {/* <button className='ellipsis_button'><HiEllipsisHorizontal/></button> */}
        </div>
    )
}