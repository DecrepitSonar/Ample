import React, { useState } from "react";
import '../styles/nav.css'
import { CgMenuGridO } from "react-icons/cg";
import { FaHome, FaTv, FaRegPlayCircle } from "react-icons/fa";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import MiniLiveComponent from './MiniLiveComponent'
import { useSelector } from "react-redux";
import { authState } from "../utils/Authslice";

function Nav(){
  const [ loggedIn, setLogin ] = useState(false)
  const auth = useSelector( state => authState.getInitialState())
  
  const navigate = useNavigate()

    return(
      <nav>
        <div className="logo">Logo</div>
        <div className="nav_avi_container">
          {
            auth.isLoggedIN ? 
            <><div className="nav_avi"></div>
            <span className="nav_username">Username</span></> :
            <button onClick={() => navigate("/login")}>Login</button>
          }
        </div>
        <div className="nav_links">
          <Link to={'/'}><span> <FaHome/> Home</span></Link>
          <Link to={'/watch'}><span> <FaTv/> Watch</span></Link>
          <Link to={'/listen'}><span> <FaRegPlayCircle/> Listen</span></Link>
          <Link to={'/browse'}><span><CgMenuGridO/> Browse</span></Link>
        </div>
        <span className="nav_section_subtitle">Live</span>
        <div className="nav_section_live_collection">
          <MiniLiveComponent/>
          <MiniLiveComponent/>
          <MiniLiveComponent/>
          <MiniLiveComponent/>
          <MiniLiveComponent/>
          <MiniLiveComponent/>
        </div>
  
      </nav>
    )
  }

  export default Nav