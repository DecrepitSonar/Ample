import React from "react";
import { useSelector } from "react-redux";
import MediumUserListItem from "./MediumUserListItem";
import { AudioListItemPropType } from "../utils/ObjectTypes";
import { RootState } from "../utils/store";
import AudioListItem from "./AudioListItem";

export default function AsideQueue(){
  
    const audioPlayer = useSelector( (state: RootState) => state.audioPlayer)
  
    const nowplayin = {
      "title": "86Sentra",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "../whylawd.jpg"
    }
  
    const queue = [
      {
        "title": "MoveOn",
        "artist": "NxWorries, Anderson .Paak",
        "imageURL": "../whylawd.jpg"
      },
      {
        "title": "KeepHer (feat. Thundercat )",
        "artist": "NxWorries, Anderson .Paak",
        "imageURL": "../whylawd.jpg"
      },
      {
        "title": "KeepHer (feat. Thundercat )",
        "artist": "NxWorries, Anderson .Paak",
        "imageURL": "../whylawd.jpg"
      },
      {
        "title": "KeepHer (feat. Thundercat )",
        "artist": "NxWorries, Anderson .Paak",
        "imageURL": "../whylawd.jpg"
      }
    ]
  
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
  
    return(
      <>
  
      {/* Now Playing */
        audioPlayer.nowPlaying ? 
        <section>
        <span className="aside_section_title">Now Playling</span>
        <div className="lib_collection_container">
          <AudioListItem {...audioPlayer.nowPlaying}/>
        </div>
      </section> : <span>Nothing playing </span>
      }
      
  
      {/* Queued  */}
  
      {/* <section>
        <span className="aside_section_title">Up next</span>
        <div className="lib_collection_container">
        {
          queue.map( ( item: AudioListItemPropType ) => {
            return <AudioListItem  {...item}/>
          })
        }
        </div>
      </section> */}
      
      {/* Features */}
      <section>
        <span className="aside_section_title">Track Features</span>
        <div className="lib_collection_container">
          {
            features.map( feature => {
              return <MediumUserListItem {...feature}/>
            })
          }
        </div>
      </section>
      </>
    )
  }