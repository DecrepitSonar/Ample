import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import UnauthorizedAside from "./UnauthorizedAside";
import AudioListItem from "./AudioListItem";

export default function AsideHistory(){
    const auth = useSelector( ( state: RootState) => state.auth)
    const audioHistory = useSelector( ( state: RootState) => state.audioPlayer.audioHistory)

    useEffect(() => console.log( audioHistory ),[])
    return(
        auth.isLoggedIn ?  
        <>
          <span className="aside_section_title"> History</span>
          <div className="aside_body">
              
              {
                audioHistory.map( item => {
                    console.log( item )
                    // return <></>
                      return <AudioListItem key={item.id} {...item}/>
                  })
              }

          </div>
        </> 
        : <UnauthorizedAside/>
)
}