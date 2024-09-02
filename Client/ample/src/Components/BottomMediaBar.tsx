import React from "react"
import { FaBackward, FaPlay, FaForward } from "react-icons/fa"
import { FaRepeat, FaShuffle } from "react-icons/fa6"

function BottomMediaBar(){
    return(
      <>
        <div id="footer">
          <div className="bottom_Mediabar_progressbar_container">
            <div className="bottom_Mediabar_progressbar"></div>
          </div>
          <div className="bottom_Mediabar_content_info_container">
            <div className="Mediabar_content_artwork"></div>
            <div className="Mediabar_content_info">
              
              <span>Trackname</span>
              <span>Artist</span>
            </div>
          </div>
          <div className="bottom_Mediabar_playercontrols">
          <span>1:12 / 3:24</span>
            <span><FaRepeat/></span>
            <span><FaBackward/></span>
            <span><FaPlay/></span>
            <span><FaForward/></span>
            <span><FaShuffle/></span>
          </div>
          <div className="bottom_Mediabar_playerOptions"></div>
        </div>
      </>
    )
  }

  export default BottomMediaBar