import React from "react"
import { MediumUserListItemPropType } from "../utils/ObjectTypes"
import { useNavigate } from "react-router-dom"

export default function MediumUserListItem(props:MediumUserListItemPropType){

    const navigate = useNavigate()
    return(
      <div className="medium_user_list_item_container" onClick={() => navigate(`/user/${props.id}`, {state: props, preventScrollReset: true})}>
        
        <div className="medium_user_list_item">
          <img className="medium_user_list_item_image" src={`https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
          <div className="medium_user_list_item_info">
            <span>{props.name}</span>
            <span>{props.artist}</span>
          </div>
        </div>
      </div>
    )
  }