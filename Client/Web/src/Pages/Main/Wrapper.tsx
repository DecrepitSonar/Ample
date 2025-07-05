import React, { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Nav from '../../Components/Nav.js'
import Trackstrip from '../../Components/TrackStrip'
import BottomMediaBar from '../../Components/BottomMediaBar.js'
import Aside from "../../Components/Aside.js"
import '../../styles/playlistStyles.css'
import '../../styles/listen.css'
import '../../styles/profile.css'
import '../../styles/sidebar.css'
import '../../styles/sideNav.css'
import { RootState } from "../../utils/store.js"
import { useSelector } from "react-redux"
import { AudioItemPropType } from "../../utils/ObjectTypes.js"
import AudioItem from "../../Components/AudioItem.js"
import { display } from "@mui/system"
import AudioListItem from "../../Components/AudioListItem.js"
import { PiPlusBold } from "react-icons/pi"



function SideNavBar(){

  const auth = useSelector( (state: RootState) => state.auth)
  const [path, setPath] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const currentLocation = location.pathname.split('/')

  useEffect(() => {
    setPath( currentLocation[1])
    console.log(currentLocation[1] == path)
  }, [currentLocation])

  const activeLink = {
    border: '.5px solid rgba(198, 161, 104,.1)',
    color: 'white',
    backgroundColor: 'rgba(198, 161, 104,.5)' 
  }
  
  const inActiveLink = {
    border: '.5px solid rgba(198, 161, 104,.2)',
    color: 'rgba(198, 161, 104,.9)',
    backgroundColor: 'transparent' 
  }
  
  return(
    <div className="sideNavBarContainer">
      { 
            auth.isLoggedIn  ? 
            < div onClick={ (e: React.SyntheticEvent) => navigate(`/profile/${auth.user.id}`)} className='nav_avi_container'>
              <div className="nav_avi" style={{'backgroundImage': `url(${auth.user.imageURL}`}}/>
              <span className="nav_usedrname">{auth.user.username}</span></div> :
             <>
              <div className="nav_auth_button_container">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Sign up</button>
             </div>
           </>
          }
    </div>
  )
}

function PlaylistModal(props){

  const modalClosedStyle = {
    display: 'none'
  }

  return(
    <div className="OptionsModalContainer" style={props.playlistModalOpen ? {} :  modalClosedStyle}>
      <div className="OptionsModal">
        <h1>Add to Playlists</h1>
        <div className="OptionsModal_main">
          <Trackstrip {...props.audioItem}/>
        </div>
        <div className="modalPlaylistList_header">
          <h3>My Playlists</h3>
          <button><PiPlusBold/></button>
        </div>
        <div className="modalPlaylistList">
          <span>You have no playlists created</span>
        </div>
      <button onClick={() => props.setPlaylistModalOpen()}>close</button>
      </div>
    </div>
  )
}

function Wrapper(){
  
  const [ navState, setNavState ] = useState( false )
  const [playlistModalOpen, setPlaylistModalOpen ] =useState<boolean>(false)
  const [ audioItem, setAudioItem ] = useState<AudioItemPropType>()
  
  const openPlaylistModal = (item: AudioItemPropType) => {
    setPlaylistModalOpen(true)
    setAudioItem(item)
    console.log( audioItem )
  }

  window.addEventListener('keypress', (e) => {
    e.key == 'p' ? setNavState(!navState) : null
  },{once: true})

    return(
        <main className="main">
          <Nav/>
          <div className="content">
              <Outlet context={{openPlaylistModal}}/>
              <Aside navState={navState}/>
          </div>
          <PlaylistModal audioItem={audioItem} playlistModalOpen={playlistModalOpen} setPlaylistModalOpen={setPlaylistModalOpen}/>
        </main>
    )
  } 
  export default Wrapper

// function useEffect(arg0: () => void, arg1: any[]) {
//   throw new Error("Function not implemented.")
// }
// function useSelector(arg0: (state: RootState) => any) {
//   throw new Error("Function not implemented.")
// }

