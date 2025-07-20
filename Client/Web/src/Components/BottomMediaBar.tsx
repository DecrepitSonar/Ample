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
import { getAverageImagecolor } from "../utils/utilFunctions"

function BottomMediaBar(props){
  const [ toggldState, setToggleState ] = useState<boolean>(false)
  
  const auth =  useSelector( (state: RootState ) => state.auth)
  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const queue = useSelector( (state: RootState ) => state.audioPlayer.queue )
  
  const progressbarRef = createRef<HTMLInputElement>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()  
  const playerContainerRef = useRef()


  const audioPlayerElement = createRef<HTMLAudioElement>()
  const asideRef = createRef<HTMLElement>()


  const [currentPlayerTime, setcurrentPlayerTime] = useState('00:00')
  const [playerDuration, setPlayerDuration] = useState('00:00')
  const [volume, setVolume ] = useState()

  function updatePlayerTime(e: React.ChangeEvent<HTMLAudioElement>){
    // setcurrentPlayerTime(`${Math.floor(e.currentTarget.currentTime / 60)  }:${(  Math.floor(e.currentTarget.currentTime % 60)).toFixed(0).padStart(2, 0)}`)
    progressbarRef.current.value = e.currentTarget.currentTime  / e.currentTarget.duration * 100
    
  }
  const setCurrentPlayerPosition = (position: number) => {
    audioPlayerElement.current.currentTime =  audioPlayerElement.current?.duration * position / 100  
  }

  // function updatePlayerDuration(e){
  //   setPlayerDuration(`${(e.currentTarget.duration / 60).toFixed(0)}:${(e.currentTarget.duration % 60).toFixed(0).padStart(2, 0)}`)
  // }

  function returnFromQueue(): any {
    throw new Error("Function not implemented.")
  }
  useEffect(() => {
    getAverageImagecolor(playerContainerRef.current)
    progressbarRef.current.value = 0 

  },[])

    return(
      <>
        <div id="footer" ref={playerContainerRef} style={ audioPlayer.nowPlaying.id != undefined ? {'right': '20px'}: {}}> 
        <div className="mediabar_overlay">
          <div className='footer_content_container'>
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
                    console.log( 'playing')
                    // setVolume(e.currentTarget.volume)
                    getAverageImagecolor( playerContainerRef.current,  document.querySelector( '.Mediabar_content_artwork').src )
                  } }
                  onEnded={() => {
                    audioPlayer.queue.length < 1 && audioPlayer.upnext.length < 1 ? dispatch(populateAudioPlayer()) :  dispatch(playNext(null))
                    // dispatch(togglePlayer(null))
                  }}
                  ref={audioPlayerElement}
                  onTimeUpdate={ (e: React.ChangeEvent<HTMLAudioElement>) => updatePlayerTime(e) }
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
              {/* <button><FaRepeat/></button> */}
              <button><FaBackward/></button>
              <button onClick={() => dispatch(togglePlayer(null))}>{audioPlayer.player.isPlaying ? <FaPause/> : <FaPlay/>   }</button>
              <button onClick={() => { 
                audioPlayer.queue.length < 1 && audioPlayer.upnext.length < 1 ? dispatch(populateAudioPlayer()) : dispatch(playNext(null))}}><FaForward/></button>
              {/* <button><FaShuffle/></button>  */}
            </div>
          </div>
          <input 
            ref={progressbarRef} 
            className="bottom_Mediabar_progress_bar" 
            type='range' 
              onClick={( e: React.FormEvent<HTMLInputElement>) => {
                setCurrentPlayerPosition( e.currentTarget.value )
              }}
          />
          </div>
        </div>
      </>
    )
  }

  export default BottomMediaBar