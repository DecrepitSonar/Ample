import React from "react"
import { AppDispatch, useAppDispatch } from "../utils/store"
import { AudioListItemPropType } from "../utils/ObjectTypes"
import { HiEllipsisHorizontal } from "react-icons/hi2"
import { play } from "../utils/mediaPlayerSlice"

export default function TrackStrip(props: AudioListItemPropType){
    const dispatch = useAppDispatch()

    return(
        <div className='small_list_item_container' onClick={() => dispatch(play(props))}>
            <img className='small_list_item_image' src={props.imageurl}/>
            <div className='small_list_item_detail_container'>
                <span>{props.title}</span>
                <span>{props.author}</span>
            </div>
            {/* <button className='ellipsis_button'><HiEllipsisHorizontal/></button> */}
        </div>
    )
}