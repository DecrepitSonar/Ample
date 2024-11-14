import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { RootState } from "../utils/store";
import AsideVideoCollection from "./AsideVideoCollection";
import Library from "./Library";
import { PiX } from "react-icons/pi";

export default function Aside(props){
  
    const [ asideLocation, setAsideLocation ] = useState('Library')
  
    const params = useParams()
    const location = useLocation()
    const auth = useSelector( ( state: RootState) => state.auth)
  
    function setNav(e: MouseEvent){
      // setLibstate( e)
      console.log( e.currentTarget)
    }
  
    const open = {
        right: '0px'
    }

    const closed = {
        right: '-300px'
    } 

    useEffect(() => {
      console.log( params )
      const currentLocation = location.pathname.split('/')[1]
      setAsideLocation(currentLocation)
    },[location])
  
    return(
    <aside style={ props.toggldState ? open : closed}>
      { 
          {
            "video": <AsideVideoCollection/>,
          }[asideLocation] || <Library/>
      }
    </aside>
    )
  }