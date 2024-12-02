import React, { createRef, useEffect, useRef, useState } from "react"
import { FaBackward, FaPlay, FaForward, FaPause } from "react-icons/fa"
import { RootState, useAppDispatch } from '../utils/store'
import { FaRepeat, FaShuffle } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { playNext, togglePlayer } from "../utils/mediaPlayerSlice"
import { useNavigate } from "react-router-dom"
import { BiVolumeFull, BiVolumeLow, BiVolumeMute } from "react-icons/bi"
import { LuListMinus } from "react-icons/lu"
import Aside from "./Aside"
import { CgClose } from "react-icons/cg"

function BottomMediaBar(props){
  const [ toggldState, setToggleState ] = useState<boolean>(false)
  
  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const progressbarRef = createRef<HTMLDivElement>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const audioPlayerElement = createRef<HTMLAudioElement>()
  const asideRef = createRef<HTMLElement>()

  const [currentPlayerTime, setcurrentPlayerTime] = useState('00:00')
  const [playerDuration, setPlayerDuration] = useState('00:00')
  const [volume, setVolume ] = useState()

  function updatePlayerTime(e){
    setcurrentPlayerTime(`${Math.floor(e.currentTarget.currentTime / 60)  }:${(  Math.floor(e.currentTarget.currentTime % 60)).toFixed(0).padStart(2, 0)}`)
    // update progress bar 
    const progressbar = document.getElementById('progressBar')
    
    progressbarRef.current.style.width =  ((e.currentTarget.currentTime / e.currentTarget.duration) * 100 ) + '%'
  
  }

  function updatePlayerDuration(e){
    setPlayerDuration(`${(e.currentTarget.duration / 60).toFixed(0)}:${(e.currentTarget.duration % 60).toFixed(0).padStart(2, 0)}`)
  }

  function returnFromQueue(): any {
    throw new Error("Function not implemented.")
  }
  useEffect(() => {
    console.log( audioPlayer.nowPlaying.imageURL != undefined)
  },[])

    return(
      <>
        <div id="footer">
          <div className="bottom_Mediabar_progressbar_container">
            <div ref={progressbarRef}id='progressBar' className="bottom_Mediabar_progressbar"/>
          </div>
          <div className="bottom_Mediabar_content_info_container" onClick={() => navigate(`/playlist/${audioPlayer.nowPlaying.albumId}`)}>
            <img className="Mediabar_content_artwork" src={
              audioPlayer.nowPlaying.imageURL != undefined ? 'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/' + audioPlayer.nowPlaying.imageURL + '.jpg' : '/album.jpg'} />
            <div className="Mediabar_content_info">
              {
                audioPlayer.nowPlaying ? 
                <audio 
                onCanPlay={(e) => {
                  updatePlayerDuration(e)
                  setVolume(e.currentTarget.volume)
                } }
                onEnded={() => dispatch(playNext(null))}
                ref={audioPlayerElement}
                onTimeUpdate={ (e) => updatePlayerTime(e) }
                id="audioPlayer" autoPlay controls preload="auto">
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
            <button onClick={() => dispatch(playNext(null))}><FaForward/></button>
            <button><FaShuffle/></button>
          </div>
          <div className="bottom_Mediabar_playerOptions">
            <span>
              {currentPlayerTime} / {playerDuration}
            </span>
            
            <div className="volume_control_container">
              <input type="range" 
                  value={audioPlayerElement.current?.volume} 
                  onChange={(e) => {
                    audioPlayerElement.current.volume =  parseInt(e.currentTarget.value) / 100 
                    setVolume(e.currentTarget.value / 100)
                  }}
              />
              {
               (() => {
                const currentVolume =  audioPlayerElement.current?.volume
                return volume > 0.5 ?  
                <button><BiVolumeFull/> </button> : 
                <button>
                  {
                    volume > 0 &&  volume <= 0.5 ? 
                    <BiVolumeLow/>  : <BiVolumeMute/>
                  }
                </button>
               })() 
              }
              <button onClick={() => props.setNavState(!props.navState)}>
                {props.navState ? 
                <CgClose/> : 
                <LuListMinus/>
              }
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  export default BottomMediaBar