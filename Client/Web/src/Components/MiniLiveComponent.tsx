import React from "react"

type LiveUserPropType = {
  username: String, 
  imageURL: String
}

function MiniLiveComponent(props: LiveUserPropType){
    return(
      <>
        <div className="nav_live_user_">
          <img className="nav_live_user_avi" src={`${props.imageURL}`}/>
          <span>{props.username}</span>
        </div>
      </>
    )
  }

  export default MiniLiveComponent