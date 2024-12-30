import React, { useState } from "react";
import { BsGlobe, BsRadar } from "react-icons/bs";
import { HiHeart } from "react-icons/hi2";
import { RiPlayList2Line } from "react-icons/ri";
import AsideHistory from "./AsideHistory";
import AsideSaved from "./AsideSaved";
import AsideQueue from "./AsideQueue";
import AsideSubscriptions from "./AsideSubscriptions";

export default function Library(){

    const [ libstate, setLibstate ] = useState<string>("Queue")
  
    function setNav(value: string){
      setLibstate( value )
    }
  
    const active = {
      color: "#C6A168",
      fontWeight: "bold",
      // borderBottom: "1px solid rgba(198, 161, 104, 1)"
    }
    const inacitve = {
      color: "#ddd"
    }
  
    return(
    <>
    <div className="aside_header">
          <button name="Queue" style={ libstate == "Queue" ? active : inacitve}
          onClick={() => { setNav('Queue')}}><RiPlayList2Line/></button>
          <button name="Saved" style={ libstate == "Saved" ? active : inacitve}
          onClick={() => { setNav('Saved')}}><HiHeart/></button>
          <button name="Saved" style={ libstate == "History" ? active : inacitve}
          onClick={() => { setNav('History')}}><BsGlobe/></button>
          <button value="Subscriptions" style={ libstate == "Subscriptions" ? active : inacitve}
          onClick={() => { setNav('Subscriptions')}}><BsRadar/></button>
      </div>
      <div className="aside_body_container">
        {
          {
            "Queue": <AsideQueue/>,
            "Saved": <AsideSaved/>,
            "History":<AsideHistory/>,
            "Subscriptions": <AsideSubscriptions/>
          }[libstate]
        }
      </div>
    </>
  )
  }