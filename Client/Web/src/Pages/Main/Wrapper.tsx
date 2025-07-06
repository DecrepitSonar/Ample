import React, { useEffect, useRef, useState } from "react"
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
import { RiImageCircleFill } from "react-icons/ri"
import httpclient from "../../httpclient.js"



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

type PlaylistITemType = {
      id: string,
      title: string, 
      author: string,
      items: [AudioItemPropType]
}

function Playlists(props){

  const [ playlists, setPlaylists ] = useState<[PlaylistITemType]>()

  const addTrackToPlaylist = async (track: AudioItemPropType, item: PlaylistITemType) => {
    
    try{
      const response = await httpclient.post('http://127.0.0.1:5000/profile/library/playlist/save', 
        {
          item: track, 
          playlistId: item.id
        }
      )
      setPlaylists(response.data[0])
    }
    catch( error ){
      console.log( error )
    }

  }

  const getUserPlaylists = async() => {
    try{
      const response = await httpclient.get('http://127.0.0.1:5000/profile/library/playlist')
      console.log( response.data[0])
      setPlaylists(response.data[0])
    }
    catch( error ){
      console.log( error )
    }
  }

  useEffect(() => {
    getUserPlaylists()
  },[])
  

  return(
      <div className="OptionsModal">
        <h1>Add to Playlists</h1>
        <div className="OptionsModal_main">
          <Trackstrip {...props.audioItem}/>
        </div>
        <div className="modalPlaylistList_header">
          <h3>My Playlists</h3>
          <button onClick={() => props.setCurrentModal('Create')}><PiPlusBold/></button>
        </div>
          {/* <span>You have no playlists</span> */}
          <div className="modalPlaylistListContainer">
            <div className="modalPlaylistList">
              {
                playlists &&
                playlists!.map( (item, index) => {
                  console.log( item )
                  return (
                    <div  onClick={() => addTrackToPlaylist(props.audioItem, item)} key={index} className="modalPlaylistItem">
                      <div className="modalPlaylistItemImage">
                        {
                          item.items && 
                          item.items.length > 0 ? 
                          item.items.map( (image: string, index: number) => {
                            return index <= 3 ?
                             <img className='PlaylistItemImage' src={ image && `https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${image.imageURL}.jpg`} alt="" />
                             : <></>
                          }) : <img className='PlaylistItemImage' src={'/album.jpg'} alt="" />
                        }
                      </div>
                      <span>{item.title}</span>
                    </div>
                    )
                })
              }
            </div>
          </div>
        <button className="submit_button_outline_negative" onClick={() => props.setPlaylistModalOpen()}>close</button>
      </div>
  )
}
function PlaylistModal(props){

  const [ titleInput, setTitleInput ] = useState('')

  const createNewPlaylist = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    httpclient.post('http://127.0.0.1:5000/profile/library/playlist', 
      {
        "title": titleInput,
      }
    )

    props.setCurrentModal('Playlist')
  }

  const modalClosedStyle = {
    display: 'none'
  }


  return(
    <div className="OptionsModalContainer" style={props.playlistModalOpen ? {} :  modalClosedStyle}>

      {
        {
          "": <></>,
          "Playlist" : <Playlists 
            setCurrentModal={props.setCurrentModal}
            audioItem={props.audioItem}
            setPlaylistModalOpen={props.setPlaylistModalOpen}
          />,
          "Create": 
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => createNewPlaylist(e)} className="newPlaylistModal">
              <h1>Create Playlist</h1>
              <span>Create a name for your playlist </span>
              <br />
              <input 
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setTitleInput( e.target.value)}
                name={'title'} 
                type="text" 
                placeholder="My Playlist"/>
              <br />
              <button className="submit_button_solid">Create</button>
              <button onClick={() => props.setCurrentModal('Playlist')} className="submit_button_outline_negative">Cancel</button>
            </form>
        }[props.currentModal as string]
      }
    </div>
  )
}

function Wrapper(){
  
  const [ navState, setNavState ] = useState( false )
  const [ currentModal, setCurrentModal ] = useState('')
  const [playlistModalOpen, setPlaylistModalOpen ] =useState<boolean>(false)
  const [ audioItem, setAudioItem ] = useState<AudioItemPropType>()
  
  const openPlaylistModal = (item: AudioItemPropType) => {
    setPlaylistModalOpen(true)
    setAudioItem(item)
    setCurrentModal('Playlist')
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
          <PlaylistModal 
          currentModal={currentModal}
          setCurrentModal={setCurrentModal}
          audioItem={audioItem} 
          playlistModalOpen={playlistModalOpen} 
          setPlaylistModalOpen={setPlaylistModalOpen}/>
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

