import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../utils/store";

function DashNav(){
    const navigate = useNavigate()
    const auth = useSelector( ( state: RootState) => state.auth)
    return(
        <nav className="dash_nav">
            <span>Dashboard</span>
            <div className='nav_profile'>
                <span>{auth.user.username}</span>
                <img className="nav_avi" src={auth.user.profileimage}/>
            </div>
        </nav>
    )
}

export default DashNav