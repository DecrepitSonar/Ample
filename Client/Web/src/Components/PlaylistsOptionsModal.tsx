import React, { SyntheticEvent, useEffect, useState } from "react";

export default function PlaylistsOptionsModal(props){

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
    console.log( props.audioItem )
  },[])
  

  return(
      <div className="OptionsModal">
        <h1>Add to Playlists</h1>
        <div className="OptionsModal_main">
          <Trackstrip {...props.audioItem} name={ props.audioItem.author}/>
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
        <button className="submit_button_outline_negative" onClick={() => props.setPlaylistModalOpen()}>Close</button>
      </div>
  )
}