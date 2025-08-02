import React, { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"

import '../../styles/playlistStyles.css'
import '../../styles/listen.css'
import '../../styles/profile.css'
import '../../styles/sidebar.css'
import '../../styles/sideNav.css'

import {logout, logOutUser } from '../../utils/Authslice'
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../utils/store.js"
import { CgEyeAlt } from "react-icons/cg"
import { BiShieldQuarter, BiLockAlt } from "react-icons/bi"
import { BsUpload, BsCreditCard2BackFill } from "react-icons/bs"
import { IoHome, IoPerson } from "react-icons/io5"
import { PiBellRingingFill } from "react-icons/pi"

function Wrapper(){
  
  const dispatch = useAppDispatch() 
  const user = useSelector( (state: RootState) => state.auth.user)
  const [navLocation, setNavLocation ] = useState("Home")
  const [ navState, setNavState ] = useState( false )
  
  const navigator = useNavigate()
  const params = useParams()
  const location = useLocation()
  const current_path = location.pathname.split('/')
  
  const activeStyle = (link: string) => {
    return navLocation === link ? {
      color: '#000', 
      backgroundColor: 'rgba(198, 160, 104, 1)',} : {}
  }

  window.addEventListener('keypress', (e) => {
    e.key == 'p' ? setNavState(!navState) : null
  },{once: true})


  useEffect(() => {
    
    if( current_path.length > 3){
      setNavLocation( current_path[current_path.length-1] )
      return 
    }

    setNavLocation('')

  }, [location])

  const logoutUser = () => { 
    dispatch(logout())
    .then(() => {
      dispatch(logOutUser(null))
      navigator(0)
      navigator('/')
    })
   }

  
    return(
        <main className="main">
          
            <div className='dash_aside'>
              <div className="dash_aside_main">
                <Link to={`/profile/${params.id}`}><li style={activeStyle("")}><i><IoHome/></i>Home</li></Link>
                <Link to={`/profile/${params.id}/account`}><li style={activeStyle("account")}><i><IoPerson/></i>Account</li></Link>
                {user.accounttype == 'creator' && <><Link to={'/dashboard'}><li><i><BsUpload/></i>Dashboard</li></Link></>}
                <Link to={`/profile/${params.id}/billing`}><li style={activeStyle("billing")}><i><BsCreditCard2BackFill/></i>Biling</li></Link>
                <Link to={`/profile/${params.id}/security`}><li style={activeStyle("security")}><i><BiShieldQuarter/></i>Security</li></Link>
                <Link to={`/profile/${params.id}/notifications`}><li style={activeStyle("notifications")}><i><PiBellRingingFill/></i>Notifications</li></Link>
                <Link to={`/profile/${params.id}/privacy`}><li style={activeStyle("Privacy")}><i><CgEyeAlt/></i>Privacy</li></Link>
              </div>
              <div className="dash_aside_bottom">
                <button onClick={() => logoutUser() }> <i style={{color: "#d6000090"}}><BiLockAlt/></i>Sign out</button>
              </div>
            </div>
            <Outlet/>
        </main>
    )
  } 
  export default Wrapper