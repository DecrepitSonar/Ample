import React from "react";
import { BsPersonCircle, BsUpload } from "react-icons/bs";
import { Link, useOutletContext } from "react-router-dom";
import { OutletProps } from "../../utils/ObjectTypes";


function Uploads(props: OutletProps){

  const { setOpenUploadModal }  = useOutletContext()

  return (
    <>
      <h1>Uploads</h1> 
    <header>
      <span>Quick Actions</span>
    </header>
    <div className=" home_header">
      <button onClick={() => setOpenUploadModal(true)}><i><BsUpload/></i> Audio</button>
      <button><i><BsUpload/></i> Playlist</button>
    </div>
    
    </>
  )
}

export default Uploads