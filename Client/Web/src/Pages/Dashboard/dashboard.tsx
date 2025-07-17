import React, { useState } from "react";
import '/src/styles/DashStyles/dashstyles.css'
import { Outlet } from "react-router-dom";
import DashAside from "./DashAside";
import UploadsModal from "../../Components/UploadsModal";

function Dashboard(){

  const [uploadModal, setOpenUploadModal ] = useState<Boolean>(false)
  
  return(
    <>
    <div className="dash_container">
      <div className="dash_body">
        <DashAside/>
        <div  style={ uploadModal ? { 'overflow': 'hidden'} : {}} className="dash_main">
            <Outlet context={{setOpenUploadModal}}/>
            <UploadsModal uploadModal={uploadModal} setOpenUploadModal={setOpenUploadModal}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard