import React, { useEffect, useState } from "react";
import '../styles/nav.css'
import { CgMenuGridO } from "react-icons/cg";
import { FaHome, FaTv, FaRegPlayCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MiniLiveComponent from './MiniLiveComponent'
import { useSelector } from "react-redux";
import { authState } from "../utils/Authslice";
import { RootState } from "../utils/store";
import { PiMagnifyingGlass } from "react-icons/pi";
import { BiBell, BiCog } from "react-icons/bi";

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
  
  const [path, setPath] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const currentLocation = location.pathname.split('/')

  useEffect(() => {
    setPath( currentLocation[1])
    // console.log(currentLocation[1] == path)
  }, [currentLocation])

  const activeLink = {
    border: '.5px solid rgba(198, 161, 104,.1)',
    color: 'white',
    backgroundColor: 'rgba(198, 161, 104,.5)' 
  }
  
  const inActiveLink = {
    border: '.5px solid rgba(198, 161, 104,.2)',
    color: 'rgba(198, 161, 104,.9)',
    backgroundColor: 'transparent' 
  }


    return(
      <nav>
        <div className="nav_main">
        <div className="logo">Alto</div>

        <div className="nav_links">
          <Link to={'/'} 
          style={currentLocation[1] == '' ? activeLink : inActiveLink}
          > <FaHome/></Link>
          <Link to={'/watch'} 
          style={currentLocation[1] == 'watch' ? activeLink : inActiveLink}
          ><FaTv/></Link>
          <Link to={'/listen'} style={currentLocation[1] == 'listen' ? activeLink : inActiveLink}
          > <FaRegPlayCircle/></Link>
          <Link to={'/browse'}
          style={currentLocation[1] == 'browse' ? activeLink : inActiveLink}><PiMagnifyingGlass/></Link>
        </div>

        {/* {
          auth.isLoggedIn && (
            <div className="nav_links">
            <Link to={'http://localhost:5174/'} 
            style={inActiveLink}
            ><span > <FaHome/> Dashboard</span></Link>
          </div>
          )
      } */}
        {/* <span className="nav_section_subtitle">Live</span>
        <div className="nav_section_live_collection">

          {
            liveUsers.map( user => {
              return <MiniLiveComponent {...user}/>
            })
          }
          
        </div> */}

        </div>

      
          {
            auth.isLoggedIn ? 
            < div className='nav_avi_container'>
              <Link to={'/notifications'} style={currentLocation[1] == 'notifications' ? activeLink : inActiveLink}>  <BiBell/></Link>
              <span onClick={ (e: React.SyntheticEvent) => navigate(`/profile/${auth.user.id}`)} className="nav_usedrname">{auth.user.username}</span>
              <div onClick={ (e: React.SyntheticEvent) => navigate(`/profile/${auth.user.id}`)} className="nav_avi" style={{'backgroundImage': `url(${auth.user.imageURL}`}}/>
            </div> :
            <>
            <div className="nav_auth_button_container">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Sign up</button>
            </div>
            </>
          }
  
      </nav>
    )
  }

  export default Nav