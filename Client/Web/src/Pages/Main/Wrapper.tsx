import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Nav from '../../Components/Nav.js'
import BottomMediaBar from '../../Components/BottomMediaBar.js'
import Aside from "../../Components/Aside.js"
import '../../styles/playlistStyles.css'
import '../../styles/listen.css'
import '../../styles/profile.css'
import '../../styles/sidebar.css'


function Wrapper(){
  
    return(
        <main className="main">
          <Nav/>
          <div className="content">
            <Outlet/>
          </div>
          <BottomMediaBar/>
        </main>
    )
  } 
  export default Wrapper