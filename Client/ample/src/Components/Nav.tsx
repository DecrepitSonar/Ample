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
  
  const liveUsers = [
    {
      username: 'belovedgarbage',
      imageURL: 'Naima-Adams_Headshots_3588-1024x1024.webp'
    },
    {
      username: 'kittenduck',
      imageURL: ''
    },
    {
      username: 'solemassage',
      imageURL: 'pngtree-painterly-portrait-of-a-woman-wearing-colorful-clothing-image_2582517.jpg'
    },
    {
      username: 'studentantelope',
      imageURL: 'Rhymezlikedimez-NFT-Artist-profile.jpg'
    },
    {
      username: 'teacorn',
      imageURL: '284a6c6d9ebb4797d251d9c00bd9fc80.jpg'
    },
    {
      username: 'feminineouch',
      imageURL: 'femtouch.jpeg'
    },
    {
      username: 'paramedicorganize',
      imageURL: 'pramedicsorganized.jpeg'
    },
    {
      username: 'screamused',
      imageURL: 'Matthew+Charles+Web+Res.jpg'
    }
  ]
  
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
            <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Sign up</button>
            </>
          }
        </div>
        <div className="nav_links">
          <Link to={'/'} ><span> <FaHome/> Home</span></Link>
          <Link to={'/watch'}><span> <FaTv/> Watch</span></Link>
          <Link to={'/listen'}><span> <FaRegPlayCircle/> Listen</span></Link>
          <Link to={'/browse'}><span><CgMenuGridO/> Browse</span></Link>
        </div>
        <span className="nav_section_subtitle">Live</span>
        <div className="nav_section_live_collection">

          {
            liveUsers.map( user => {
              return <MiniLiveComponent {...user}/>
            })
          }
          
        </div>
  
      </nav>
    )
  }

  export default Nav