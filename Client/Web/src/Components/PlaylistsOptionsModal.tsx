import React, { SyntheticEvent, useEffect, useState } from "react";
import TrackStrip from "./TrackStrip";
import { PiPlusBold } from "react-icons/pi";
import httpclient from "../httpclient";
import { PlaylistITemType, AudioItemPropType, AudioListItemPropType } from "../utils/ObjectTypes";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
import { showNotification, hideNotification } from "../utils/notificationSlice";
import { useAppDispatch } from "../utils/store";

export default function PlaylistsOptionsModal(props:
  {
    audioItem: AudioItemPropType
    setCurrentModal: React.Dispatch<React.SetStateAction<string>>
    setPlaylistModalOpen: Function
  }
){

  const [ playlists, setPlaylists ] = useState<[PlaylistITemType]>()
  const dispatch = useAppDispatch()
  const addTrackToPlaylist = async (track: AudioItemPropType, item: PlaylistITemType) => {
    
    try{
      const response = await httpclient.post('http://127.0.0.1:5000/profile/library/playlist/save', 
        {
          item: track, 
          playlistId: item.id
        }
      )
      if ( response.status == 200){
        setPlaylists(response.data[0])       
        dispatch(showNotification('Track Saved '))

        setTimeout(() => {
          dispatch(hideNotification())
        }, 2000); 
      }
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

  const deletePlaylist = async(id: string) => {
    try{
      const response = await httpclient.delete(`http://127.0.0.1:5000/profile/library/playlist?id=${id}`)
      console.log( response )

      if ( response.status == 200){
        setPlaylists(response.data[0])
              
        dispatch(showNotification('Playlist Deleted'))

        setTimeout(() => {
          dispatch(hideNotification())
        }, 2000); 
      }

    }
    catch( error){
      console.log( error )
    }
    // console.log( id )
  }
  useEffect(() => {
    getUserPlaylists()
    console.log( props.audioItem )
  },[])
  

  return(
      <div className="OptionsModal">
        <h1>Add to Playlists</h1>
        <div className="OptionsModal_main">
          <TrackStrip {...props.audioItem}/>
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
                    <div key={index} className="modalPlaylistItemContainer">
                      <div onClick={() => addTrackToPlaylist(props.audioItem, item)} className="modalPlaylistItem">
                        <div className="modalPlaylistItemImage">
                          {
                            item.items && 
                            item.items.length > 0 ? 
                            item.items.map( (image: AudioListItemPropType, index: number) => {
                              return index >= 1 ?
                              <img className='PlaylistItemImage' src={ image && `${image.imageurl}`} alt="" />
                              : <img className='PlaylistItemImage' src={'/album.jpg'} alt="" />
                            }) : <img className='PlaylistItemImage' src={'/album.jpg'} alt="" />
                          }
                        </div>
                        <span>{item.title}</span>
                      </div>
                      <span className="modalPlaylistItem_delete"onClick={() => deletePlaylist( item.id)}><IoCloseCircleOutline/></span>
                    </div>
                    )
                })
              }
            </div>
          </div>
        <button className="submit_button_outline_negative" onClick={() => props.setPlaylistModalOpen()}>Cancel</button>
      </div>
  )
}