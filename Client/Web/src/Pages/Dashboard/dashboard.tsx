import React, { useState } from "react";
import '/src/styles/DashStyles/dashstyles.css'
import { Outlet } from "react-router-dom";
import DashAside from "./DashAside";
import UploadsModal from "../../Components/UploadsModal";

function Dashboard(){

  const [uploadModal, setOpenUploadModal ] = useState<Boolean>(false)
  
  return(
    <>
    <main className="dash_container">
        <DashAside/>
        <div  style={ uploadModal ? { 'overflow': 'hidden'} : {}} className="dash_main">
            <Outlet context={{setOpenUploadModal}}/>
            <UploadsModal uploadModal={uploadModal} setOpenUploadModal={setOpenUploadModal}/>
        </div>
    </main>
    </>
  )
}

export default Dashboard