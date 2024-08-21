import React, { useState } from "react"
import '../styles/sidebar.css'
import { FaSearch } from "react-icons/fa"
import { Outlet } from "react-router-dom"
import Nav from '../Components/Nav.jsx'
import BottomMediaBar from '../Components/BottomMediaBar.jsx'

function AudioListItem(props){
  return(
  <div className="audio_list_item_container">
    <div className="audio_list_item_image" 
    style={{'backgroundImage': `url(${props.data.imageURL})`}}/>
    <div className="audio_list_item_info">
      <span>{props.data.title}</span>
      <span>{props.data.artist}</span>
    </div>
  </div>
  )
}

function MediumUserListItem(props){
  return(
    <div className="medium_user_list_item_container">
      <div className="medium_user_list_item">
        <div className="medium_user_list_item_image"
        style={{"backgroundImage": `url(${props.data.imageURL})`}}/>
        <div className="medium_user_list_item_info">
          <span>{props.data.artist}</span>
        </div>
      </div>
    </div>
  )
}
function AsideQueue(){
  
  const nowplayin = {
    "title": "86Sentra",
    "artist": "NxWorries, Anderson .Paak",
    "imageURL": "whylawd.jpg"
  }

  const queue = [
    {
      "title": "MoveOn",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "whylawd.jpg"
    },
    {
      "title": "KeepHer (feat. Thundercat )",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "whylawd.jpg"
    },
    {
      "title": "KeepHer (feat. Thundercat )",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "whylawd.jpg"
    },
    {
      "title": "KeepHer (feat. Thundercat )",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "whylawd.jpg"
    }
  ]

  const features = [
    {
      "artist": "Anderson .Paak",
      "imageURL": "andersonpaak.jpg"
    },
    {
      "artist": "NxWorries",
      "imageURL": "yeslawd.jpg"
    },

    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
  ]

  return(
    <>
    {/* Now Playing */}
    <section>
      <span className="aside_section_title">Now Playling</span>
      <div className="lib_collection_container">
        <AudioListItem data={nowplayin}/>
      </div>
    </section>

    {/* Queued  */}

    <section>
      <span className="aside_section_title">Up next</span>
      <div className="lib_collection_container">
      {
        queue.map( item => {
          return <AudioListItem data={item}/>
        })
      }
      </div>
    </section>
    
    {/* Features */}
    <section>
      <span className="aside_section_title">Track Features</span>
      <div className="lib_collection_container">
        {
          features.map( feature => {
            return <MediumUserListItem data={feature}/>
          })
        }
      </div>
    </section>
    </>
  )
}
function AsideSaved(){
  return(
    <>Saved</>
  )
}
function AsideHistory(){
  return(
    <>History</>
  )
}

function Aside(){
  const [ libstate, setLibstate ] = useState("Queue")

  const active = {
    color: "#C6A168",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(198, 161, 104, 1)"
  }
  const inacitve = {
    color: "#ddd"
  }

  function setNav(e){
    setLibstate( e.target.innerHTML)
  }
  return(
  <aside>
    <div className="aside_header">
      <span>Library</span>
      <ul>
        <li style={ libstate == "Queue" ? active : inacitve}
        onClick={(e) => { setNav(e)}}>Queue</li>
        <li style={ libstate == "Saved" ? active : inacitve}
        onClick={(e) => { setNav(e)}}>Saved</li>
        <li style={ libstate == "History" ? active : inacitve}
        onClick={(e) => { setNav(e)}}>History</li>
      </ul>
    </div>
    <div className="aside_body">
      {
        {
          "Queue": <AsideQueue/>,
          "Saved": <AsideSaved/>,
          "History":<AsideHistory/>
        }[libstate]
      }
    </div>
  </aside>
  )
}

function Wrapper(props){
    return(
        <main>
          <Nav/>
          <div className="content">
            <div className="floating_search_bar">
              <input type="text" placeholder="Search"/>
            </div>
            <Outlet/>
          </div>
          <Aside/>
          <BottomMediaBar/>
        </main>
    )
  }
  export default Wrapper