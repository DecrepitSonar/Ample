import React, { createRef, useEffect, useRef, useState } from "react"
import { FaBackward, FaPlay, FaForward, FaPause } from "react-icons/fa"
import { RootState, useAppDispatch } from '../utils/store'
import { FaRepeat, FaShuffle } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { playNext, populateAudioPlayer, setAudioHistory, togglePlayer } from "../utils/mediaPlayerSlice"
import { useNavigate } from "react-router-dom"
import { BiVolumeFull, BiVolumeLow, BiVolumeMute } from "react-icons/bi"
import { LuListMinus } from "react-icons/lu"
import Aside from "./Aside"
import { CgClose } from "react-icons/cg"
import httpclient from "../httpclient"

function BottomMediaBar(props){
  const [ toggldState, setToggleState ] = useState<boolean>(false)
  
  const auth =  useSelector( (state: RootState ) => state.auth)
  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const queue = useSelector( (state: RootState ) => state.audioPlayer.queue )
  
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
    // console.log( audioPlayer.nowPlaying.imageURL != undefined)
    
  },[])

  useEffect(() => {
    auth.isLoggedIn == true && 
      httpclient.get(`http://127.0.0.1:5000/history?filter=audio&&id=${auth.user.id}`)
      .then( response => {
        dispatch(setAudioHistory(response.data))
        // console.log(response.data)
      })
  }, [auth.user, audioPlayer.nowPlaying])

    return(
      <>
        <div id="footer">
          <div className="bottom_Mediabar_progressbar_container">
            <div ref={progressbarRef}id='progressBar' className="bottom_Mediabar_progressbar"/>
          </div>
          <div className="bottom_Mediabar_content_info_container">
            <img className="Mediabar_content_artwork" 
            onClick={() => navigate(`/playlist/${audioPlayer.nowPlaying.albumId}`)}
            src={
              audioPlayer.nowPlaying.imageURL != undefined ? 'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/' + audioPlayer.nowPlaying.imageURL + '.jpg' : '/album.jpg'} />
            <div className="Mediabar_content_info">
              {
                audioPlayer.nowPlaying ? 
                <audio 
                // onPlay={() => dispatch(togglePlayer(null))}
                onCanPlay={(e) => {
                  updatePlayerDuration(e)
                  setVolume(e.currentTarget.volume)
                } }
                onEnded={() => {
                  audioPlayer.queue.length < 1 && audioPlayer.upnext.length < 1 ? dispatch(populateAudioPlayer()) :  dispatch(playNext(null))
                  // dispatch(togglePlayer(null))
                }}
                ref={audioPlayerElement}
                onTimeUpdate={ (e) => updatePlayerTime(e) }
                id="audioPlayer" autoPlay controls preload="auto">
                <source src={
                  audioPlayer.nowPlaying.imageURL != '' ? 
                   'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + audioPlayer.nowPlaying.audioURL +'.mp3': 'album.jpg' } type="audio/mp3"/>
              </audio> : <></>
              }

              <span>{audioPlayer.nowPlaying.title ? audioPlayer.nowPlaying.title : 'Title'}</span>
              <span onClick={() => navigate(`/user/${audioPlayer.nowPlaying.id}`, {state: props, preventScrollReset: true})} >{audioPlayer.nowPlaying.name ? audioPlayer.nowPlaying.name : 'Artist'}</span>
            </div>
          </div>
          <div className="bottom_Mediabar_playercontrols">
            <button><FaRepeat/></button>
            <button><FaBackward/></button>
            <button onClick={() => dispatch(togglePlayer(null))}>{audioPlayer.player.isPlaying ? <FaPause/> : <FaPlay/>   }</button>
            <button onClick={() => {
              audioPlayer.queue.length < 1 && audioPlayer.upnext.length < 1 ? dispatch(populateAudioPlayer()) : dispatch(playNext(null))}}><FaForward/></button>
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