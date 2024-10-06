import React from "react"
import '../styles/sidebar.css'
import { Outlet } from "react-router-dom"
import Nav from '../Components/Nav.js'
import BottomMediaBar from '../Components/BottomMediaBar.js'
import Aside from "../Components/Aside.js"




function Wrapper(){
    return(
        <main>
          <Nav/>
          <div className="content">
            <Outlet/>
          </div>
          <Aside/>
          <BottomMediaBar/>
        </main>
    )
  }
  export default Wrapper