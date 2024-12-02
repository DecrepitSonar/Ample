import React from "react"
import { MediumUserListItemPropType } from "../utils/ObjectTypes"
import { useNavigate } from "react-router-dom"

export default function MediumUserListItem(props:MediumUserListItemPropType){

    const navigate = useNavigate()
    return(
      <div className="medium_user_list_item_container" onClick={() => navigate(`/profile/${props.id}`)}>
        <div className="medium_user_list_item">
          <img className="medium_user_list_item_image" src={props.imageURL}/>
          <div className="medium_user_list_item_info">
            <span>{props.title}</span>
            <span>{props.artist}</span>
          </div>
        </div>
      </div>
    )
  }