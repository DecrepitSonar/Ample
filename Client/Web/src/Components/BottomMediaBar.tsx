import React, { useEffect, useRef, useState } from "react"
import { FaBackward, FaPlay, FaForward, FaPause } from "react-icons/fa"
import { RootState, useAppDispatch } from '../utils/store'
import { FaRepeat, FaShuffle } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { next, togglePlayer } from "../utils/mediaPlayerSlice"

function BottomMediaBar(){
  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const progressbarRef = useRef()
  const dispatch = useAppDispatch()

  const [currentPlayerTime, setcurrentPlayerTime] = useState('00:00')
  const [playerDuration, setPlayerDuration] = useState('00:00')
  

  function updatePlayerTime(e){
    setcurrentPlayerTime(`${Math.floor(e.currentTarget.currentTime / 60)  }:${(  Math.floor(e.currentTarget.currentTime % 60)).toFixed(0).padStart(2, 0)}`)
    // update progress bar 
    const progressbar = document.getElementById('progressBar')
    
    progressbar.style.width =  ((e.currentTarget.currentTime / e.currentTarget.duration) * 100 ) + '%'
  
  }

  function updatePlayerDuration(e){
    setPlayerDuration(`${(e.currentTarget.duration / 60).toFixed(0)}:${(e.currentTarget.duration % 60).toFixed(0).padStart(2, 0)}`)
  }

  function returnFromQueue(): any {
    throw new Error("Function not implemented.")
  }

    return(
      <>
        <div id="footer">
          <div className="bottom_Mediabar_progressbar_container">
            <div ref={progressbarRef}id='progressBar' className="bottom_Mediabar_progressbar"/>
          </div>
          <div className="bottom_Mediabar_content_info_container">
            <img className="Mediabar_content_artwork" src={'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/' + audioPlayer.nowPlaying.imageURL + '.jpg'}/>
            <div className="Mediabar_content_info">
              {
                audioPlayer.nowPlaying ? 
                <audio 
                onCanPlay={(e) => updatePlayerDuration(e) }
                onTimeUpdate={ (e) => updatePlayerTime(e) }
                id="audioPlayer" autoPlay  controls preload="auto">
                <source src={
                  audioPlayer.nowPlaying.imageURL != '' ? 
                   'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + audioPlayer.nowPlaying.audioURL +'.mp3': 'album.jpg' } type="audio/mp3"/>
              </audio> : <></>
              }

              <span>{audioPlayer.nowPlaying.title ? audioPlayer.nowPlaying.title : 'Title'}</span>
              <span>{audioPlayer.nowPlaying.name ? audioPlayer.nowPlaying.name : 'Artist'}</span>
            </div>
          </div>
          <div className="bottom_Mediabar_playercontrols">
            <button><FaRepeat/></button>
            <button><FaBackward/></button>
            <button onClick={() => dispatch(togglePlayer(null))}>{audioPlayer.player.isPlaying ? <FaPause/> : <FaPlay/>   }</button>
            <button><FaForward/></button>
            <button><FaShuffle/></button>
          </div>
          <div className="bottom_Mediabar_playerOptions">
            <span>
              {currentPlayerTime} / {playerDuration}
            </span>
          </div>
        </div>
      </>
    )
  }

  export default BottomMediaBar