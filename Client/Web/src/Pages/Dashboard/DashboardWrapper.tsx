import React from "react"
import { Outlet } from "react-router-dom"
import '../../styles/DashStyles/dashstyles.css'
function DashboardWrapper(){
    return(
        <main className="dashboard">
          <div className="dashboard_main">
            <Outlet/>
          </div>
          <div className="dash_Nav">
            
          </div>
        </main>
    )
  } 
  export default DashboardWrapper