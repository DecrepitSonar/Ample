import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { RootState } from "../utils/store";
import AsideVideoCollection from "./AsideVideoCollection";
import Library from "./Library";

export default function Aside(){
  
    const [ asideLocation, setAsideLocation ] = useState('Library')
  
    const params = useParams()
    const location = useLocation()
    const auth = useSelector( ( state: RootState) => state.auth)
  
    function setNav(e: MouseEvent){
      // setLibstate( e)
      console.log( e.currentTarget)
    }
  
    useEffect(() => {
      console.log( params )
      const currentLocation = location.pathname.split('/')[1]
      setAsideLocation(currentLocation)
    },[location])
  
    return(
    <aside>
      { 
          {
            "video": <AsideVideoCollection/>,
            "live":<LiveComments/>,
          }[asideLocation] || <Library/>
      }
    </aside>
    )
  }


  function LiveComments(){
    return(
      <>Live Comments </>
    )
  }
  