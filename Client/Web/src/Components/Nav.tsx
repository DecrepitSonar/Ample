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
import httpclient from "../httpclient";
import { BsUpload } from "react-icons/bs";

function Nav(){
  // const [ loggedIn, setLogin ] = useState(false)
  const auth = useSelector( (state: RootState) => state.auth)
  
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
        <div className="logo"><Link to={'/'}>Distrolog</Link></div>

        <div className="nav_links">
          {/* <Link to={'/'} style={currentLocation[1] == 'listen' ? activeLink : inActiveLink}> <FaRegPlayCircle/></Link> */}
        </div>

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
              <Link to={'/browse'} style={currentLocation[1] == 'browse' ? activeLink : inActiveLink}><PiMagnifyingGlass/></Link>
              <Link to={'/notifications'} style={currentLocation[1] == 'notifications' ? activeLink : inActiveLink}>  <BiBell/></Link>
              {
                auth.isLoggedIn && <Link to={'/dashboard'} style={currentLocation[1] == 'notifications' ? activeLink : inActiveLink}>  <BsUpload/></Link>
              }
              <Link to={`/profile/${auth.user.id}`} className='nav_profile'>
                <span>{auth.user.username}</span>
                <img className="nav_avi" src={auth.user.profileimage}/>
              </Link>
            </div> :
            <div className="nav_avi_container">
              <Link to={'/browse'} style={currentLocation[1] == 'browse' ? activeLink : inActiveLink}><PiMagnifyingGlass/></Link>
            <div className="nav_auth_button_container">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Sign up</button>
            </div>
            </div>
          }
  
      </nav>
    )
  }

  export default Nav