import React, { useEffect, useState } from "react";
import { BsPersonCircle, BsUpload } from "react-icons/bs";
import { Link, useOutletContext } from "react-router-dom";
import { AudioItemPropType, OutletProps } from "../../utils/ObjectTypes";
import AudioItem from "../../Components/AudioItem";
import httpclient from "../../httpclient";
import { useAppDispatch } from "../../utils/store";


function Uploads(props: OutletProps){

  const { setOpenUploadModal }  = useOutletContext()
  const [ navState, setNavState ] = useState("All")
  const [ libraryItems, setLibItems ] = useState<[AudioItemPropType]>()

  const dispatch = useAppDispatch()

  const getUploads = async () => {
    try {
      const response = await httpclient.get('http://127.0.0.1:5000/dashboard/uploads')
      setLibItems(response.data)
      console.log( libraryItems)

    } catch (error) {
      console.log( error )
    }
  }

  useEffect(() => {
    getUploads()
  },[])
  
  
  return (
    <div className="dash_uploads_container">
      <h1>Uploads</h1> 
      <header>
        <span>Quick Actions</span>
        <div className="home_header">
          <button onClick={() => setOpenUploadModal(true)}><i><BsUpload/></i> Upload</button>
        </div>
      </header>
      <div className="profile_content_filter">
        <ul>
          <li style={ navState == 'All' ? {'color': 'rgb(198, 161, 104)'} : {}} onClick={() => setNavState('All')} >All</li>
          <li style={ navState == 'Tracks' ? {'color': 'rgb(198, 161, 104)'} : {}} onClick={() => setNavState('Tracks')}>Tracks</li>
          <li style={ navState == 'Albums' ? {'color': 'rgb(198, 161, 104)'} : {}} onClick={() => setNavState('Albums')}>Albums</li>
        </ul>
      </div>
      <div className="page_body_content after">
        {
          libraryItems &&
          libraryItems.map( item => {
            return <AudioItem key={item.id} {...item}/>
          })
        }
      </div>
    </div>
  )
}

export default Uploads