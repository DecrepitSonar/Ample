import React from "react";
import { useSelector } from "react-redux";
import MediumUserListItem from "./MediumUserListItem";
import { AudioListItemPropType } from "../utils/ObjectTypes";
import { RootState } from "../utils/store";
import AudioListItem from "./AudioListItem";

export default function AsideQueue(){
  
    const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  
    const features = [
      {
        "artist": "Anderson .Paak",
        "imageURL": "../andersonpaak.jpg"
      },
      {
        "artist": "NxWorries",
        "imageURL": "../yeslawd.jpg"
      },
  
      {
        "artist": "Knowledge",
        "imageURL": "../knx.jpg"
      },
    ]
  
    console.log( audioPlayer.nowPlaying )
    return(
      <>
  
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
        audioPlayer.queue.length > 0 ? 
        <section>
        <span className="aside_section_title">Up next</span>
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
      </>
    )
  }