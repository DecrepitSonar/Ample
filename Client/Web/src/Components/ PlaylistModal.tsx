import React, { SyntheticEvent, useEffect, useState } from "react";
import httpclient from "../httpclient";
import PlaylistsOptionsModal from "./PlaylistsOptionsModal";
import { AudioItemPropType } from "../utils/ObjectTypes";
import { showNotification, hideNotification } from "../utils/notificationSlice";
import { useAppDispatch } from "../utils/store";

export default function PlaylistModal(props:{
  setCurrentModal: React.Dispatch<React.SetStateAction<string>>
  currentModal: string
  playlistModalOpen: boolean
  setPlaylistModalOpen: Function
  audioItem: AudioItemPropType
}){

  const [ titleInput, setTitleInput ] = useState('')
  const dispatch = useAppDispatch()
  const modalClosedStyle = {
    display: 'none'
  }

  const createNewPlaylist = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try{
      
      const response = await httpclient.post('http://127.0.0.1:5000/profile/library/playlist', { "title": titleInput })
      console.log( response )
      
      if ( response.status == 200){
          // setPlaylists(response.data[0])
                
          dispatch(showNotification(`Playlist "${titleInput}" created`))
  
          setTimeout(() => {
            dispatch(hideNotification())
          }, 2000); 
        }

    }
    catch( err ){
      console.log( err )
    }

    props.setCurrentModal('Playlist')
  }

  return(
    <div className="ModalContainer" style={props.playlistModalOpen ? {} : modalClosedStyle}>
      {
        {
          "": <></>,
          "Playlist" : <PlaylistsOptionsModal
            setCurrentModal={props.setCurrentModal}
            audioItem={props.audioItem}
            setPlaylistModalOpen={props.setPlaylistModalOpen}
          />,
          "Create": 
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => createNewPlaylist(e)} className="newPlaylistModal">
              <h1>New Playlist</h1>
              <span>Name your new playlist </span>
              <br />
              <input 
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setTitleInput( e.target.value)}
                name={'title'} 
                type="text" 
                placeholder="My Playlist"/>

              <div className="create_button_container">
                <button className="submit_button_solid">Create</button>
                <button onClick={() => props.setCurrentModal('Playlist')} className="submit_button_outline_negative">Cancel</button>
              </div>
            </form>
        }[props.currentModal as string]
      }
    </div>
  ) 
}