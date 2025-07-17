import React, { SyntheticEvent, useEffect, useState } from "react";
import httpclient from "../httpclient";
import PlaylistsOptionsModal from "./PlaylistsOptionsModal";

export default function PlaylistModal(props){

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
          "Playlist" : <PlaylistsOptionsModal
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

function CreateNewPlaylistModal(props){
    
}