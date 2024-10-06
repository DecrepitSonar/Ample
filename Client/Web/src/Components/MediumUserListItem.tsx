import React from "react"
import { MediumUserListItemPropType } from "../utils/ObjectTypes"

export default function MediumUserListItem(props:MediumUserListItemPropType){

    return(
      <div className="medium_user_list_item_container">
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