import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { RootState } from "../../utils/store";
import { FaDollarSign, FaUpload } from "react-icons/fa";
import { BsColumnsGap, BsFillFileBarGraphFill } from "react-icons/bs";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { IoChevronBack } from "react-icons/io5";

function DashAside(){

    const  [navLoaction, setNavLocation ] = useState('')
    const auth = useSelector( ( state: RootState) => state.auth)
    
    const location = useLocation()

    useEffect(()=> {
        const currentLocation = location.pathname.split('/')
        const pathLength = currentLocation.length


        if(currentLocation[pathLength-1] == ''){
            setNavLocation(currentLocation[pathLength-2])
        }
        else{
            setNavLocation(currentLocation[pathLength-1])
        }
    })


  const activeStyle = (link) => {
    return navLoaction === link ? {
        backgroundColor: 'rgba(198, 160, 104, 1)',
        color: '#000' 
    }: {}
  }

  const navigator = useNavigate()
    return(
        <div className="dash_aside">
           <Link to={`/profile/${auth.user.id}`}> <li> <i><IoChevronBack/></i> Profile</li></Link>
           <Link to={'/dashboard/'}><li style={activeStyle('dashboard')}><i><BsColumnsGap/></i> Dashboard</li></Link>
           <Link to={'/dashboard/Uploads'}><li style={activeStyle('Uploads')} ><i> <RiArchiveDrawerFill/></i> MyContent</li></Link>
           {/* <Link to={'/dashboard/Uploads'}><li><i> <BsFillFileBarGraphFill/></i> Analytics</li></Link> */}
           {/* <Link to={'/dashboard/Uploads'}><li><i> <FaDollarSign/></i> Earnings</li></Link> */}
        </div>
    )
}

export default DashAside