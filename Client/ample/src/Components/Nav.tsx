import React, { useState } from "react";
import '../styles/nav.css'
import { CgMenuGridO } from "react-icons/cg";
import { FaHome, FaTv, FaRegPlayCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import MiniLiveComponent from './MiniLiveComponent'
import { useSelector } from "react-redux";
import { authState } from "../utils/Authslice";
import { RootState } from "../utils/store";

function Nav(){
  // const [ loggedIn, setLogin ] = useState(false)
  const auth = useSelector( (state: RootState) => state.auth)
  
  const navigate = useNavigate()

    return(
      <nav>
        <div className="logo">Logo</div>
        <div className="nav_avi_container">
          {
            auth.isLoggedIn ? 
            < div onClick={ (e: React.SyntheticEvent) => navigate(`/profile/${auth.user.id}`) }><div className="nav_avi" 
            style={{'backgroundImage': `url(${auth.user.imageURL}`}}/>
            <span className="nav_username">{auth.user.username}</span></div> :
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