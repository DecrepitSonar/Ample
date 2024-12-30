import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { RootState } from "../utils/store";
import '../styles/aside.css'
import AsideVideoCollection from "./AsideVideoCollection";
import Library from "./Library";
import { PiX } from "react-icons/pi";

export default function Aside(props){
  
    const [ asideLocation, setAsideLocation ] = useState('Library')
  
    const params = useParams()
    const location = useLocation()
    const auth = useSelector( ( state: RootState) => state.auth)
  
    const open = {
        right: '0px'
    }

    const closed = {
        right: '-300px'
    } 

    useEffect(() => {
      const currentLocation = location.pathname.split('/')[1]
      setAsideLocation(currentLocation)
    },[location])
  
    return(
    <aside style={ props.navState ? open : closed}>
      { 
          {}[asideLocation] || <Library/>
      }
    </aside>
    )
  }