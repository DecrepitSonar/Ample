import React from "react";
import { useSelector } from "react-redux";
import MediumUserListItem from "./MediumUserListItem";
import { AudioListItemPropType } from "../utils/ObjectTypes";
import { RootState } from "../utils/store";
import AudioListItem from "./AudioListItem";
import { useDispatch } from "react-redux";
import { clearQueue } from "../utils/mediaPlayerSlice";

export default function AsideQueue(){
  
    const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
    
    const dispatch = useDispatch()

    return(
      <div className="aside_body">
  
      {/* Now Playing */
        audioPlayer.nowPlaying.title != undefined ? 
        <section>
        <span className="aside_section_title">Now Playling</span>
        <div className="lib_collection_container">
          <div className="large_Track_item_container">
            <img  src={`https://prophile.nyc3.digitaloceanspaces.com/images/${audioPlayer.nowPlaying.imageURL}.jpg`} className="large_Track_item_cover"/>
            <span className="large_Track_item_title">{audioPlayer.nowPlaying.title}</span>
            <span className="large_Track_item_author">{audioPlayer.nowPlaying.name}</span>
          </div>
        </div>
      </section> : 
      <section>
        <div className="large_Track_item_container">
          <img  src={'/album.jpg'} className="large_Track_item_cover"/>
          <span className="aside_section_title">Nothing Playling</span>
        </div>
      </section>
      
      }
      
  
      {/* Queued  */}
  
      {
        audioPlayer.upnext.length > 0 ? 
        <section>
          <div className="queue_list_header">
            <span className="aside_section_title">Up Next</span>
            {/* <button onClick={() => dispatch(clearQueue())}>Clear</button> */}
          </div>
        
        <div className="lib_collection_container">
        {
          audioPlayer.upnext.map( ( item: AudioListItemPropType ) => {
            return <AudioListItem  {...item}/>
          })
        }
        </div>
      </section> : <></>
      }

      {
        audioPlayer.queue.length > 0 ? 
        <section>
          <div className="queue_list_header">
            <span className="aside_section_title">Queue</span>
            <button onClick={() => dispatch(clearQueue())}>Clear</button>
          </div>
        
        <div className="lib_collection_container">
        {
          audioPlayer.queue.map( ( item: AudioListItemPropType ) => {
            return <AudioListItem  {...item}/>
          })
        }
        </div>
      </section> : <></>
      }
      
      {/* Features */}
      {/* <section>
        <span className="aside_section_title">Track Features</span>
        <div className="lib_collection_container">
          {
            features.map( feature => {
              return <MediumUserListItem {...feature}/>
            })
          }
        </div>
      </section> */}
      </div>
    )
  }