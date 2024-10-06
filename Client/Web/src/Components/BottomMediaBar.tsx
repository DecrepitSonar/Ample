import React, { useEffect, useRef } from "react"
import { FaBackward, FaPlay, FaForward, FaPause } from "react-icons/fa"
import { RootState, useAppDispatch } from '../utils/store'
import { FaRepeat, FaShuffle } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { togglePlayer } from "../utils/mediaPlayerSlice"

function BottomMediaBar(){
  const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  const audioPlayerRef = useRef<HTMLAudioElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('update')
  }, [audioPlayer.nowPlaying])
    return(
      <>
        <div id="footer">
          <div className="bottom_Mediabar_progressbar_container">
            <div className="bottom_Mediabar_progressbar"></div>
          </div>
          <div className="bottom_Mediabar_content_info_container">
            <img className="Mediabar_content_artwork" src={'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/' + audioPlayer.nowPlaying.imageURL + '.jpg'}/>
            <div className="Mediabar_content_info">
              {
                audioPlayer.nowPlaying ? 
                <audio 
                onTimeUpdate={ (e) => console.log( e.currentTarget.duration) }
                id="audioPlayer" ref={audioPlayerRef} autoPlay  controls preload="auto">
                <source src={'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + audioPlayer.nowPlaying.audioURL +'.mp3'} type="audio/mp3" />
              </audio> : <></>
              }

              <span>{audioPlayer.nowPlaying.title ? audioPlayer.nowPlaying.title : 'title'}</span>
              <span>{audioPlayer.nowPlaying.name ? audioPlayer.nowPlaying.name : 'artist'}</span>
            </div>
          </div>
          <div className="bottom_Mediabar_playercontrols">
            <span><FaRepeat/></span>
            <span><FaBackward/></span>
            <span onClick={() => dispatch(togglePlayer(null))}>{audioPlayer.player.isPlaying ? <FaPause/> : <FaPlay/>   }</span>
            <span><FaForward/></span>
            <span><FaShuffle/></span>
          </div>
          <div className="bottom_Mediabar_playerOptions">
            <span>
            </span>
          </div>
        </div>
      </>
    )
  }

  export default BottomMediaBar