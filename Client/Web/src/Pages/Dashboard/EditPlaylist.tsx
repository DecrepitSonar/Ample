import { useState, useEffect } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { BsPlusCircle } from "react-icons/bs"
import { useParams } from "react-router-dom"
import PlaylistItem from "../../Components/PlaylistItem"
import httpclient from "../../httpclient"
import { AudioItemPropType } from "../../utils/ObjectTypes"
import { hideNotification, notifications, showNotification } from "../../utils/notificationSlice"
import { useAppDispatch } from "../../utils/store"

export default function EditPlaylist(){
  
    const [ pageData, setPageData] = useState<{
      head: undefined,
      body: []
    }>()
  
    const [modalOpen, setModalOpen ] = useState(false) 
    const [ modalForm, setModalForm ] = useState('')
    const [ selectedTrack, setSelectedTrack ] = useState<{
        id: string, 
        playlist_id: string
    }>({})
  
    const [audioFile, setAudioFile] = useState<Blob>()
    const [imageFile, setImageFile] = useState<Blob>()
  
    const params = useParams()
    const dispatch = useAppDispatch()
    
    const getPlaylistData = async () => {
      try{
        const response = await httpclient.get(`http://127.0.0.1:5000/dashboard/edit/playlist?playlist_id=${params.id}`)
            setPageData( response.data )
      }
      catch( err ){
        console.log( err )
      }
    }
  
    const uploadPlaylistTrack = async (e: React.SyntheticEvent ) => {
  
      e.preventDefault()
  
      const target = e.target as typeof e.target & {
        image: {value: Blob},
        title: {value: string},
        genre: {value: string},
        type: {value: string},
        category: {value: string},
        audio_file: {value: Blob}
      } 
  
      const form = new FormData()
      form.append('title', target.title.value)
      form.append('genre', target.genre.value)
      form.append('imageurl', pageData?.head.imageurl)
      form.append('category', target.category.value)
      // form.append('contenturl')
      form.append('playlist_id', pageData?.head.id)
      form.append('author_id', pageData?.head.author_id)
      form.append('author', pageData?.head.author)
      form.append('type', target.type.value )
      form.append('audio_file', audioFile! )
  
      try{
        console.log( form )
        const response = await httpclient.post(`http://127.0.0.1:5000/dashboard/edit/playlist/upload`, form)
        console.log( response.data )
        if( response.status == 200){
            
            setModalOpen(false)

            setPageData({
              head: pageData?.head, 
              body: response.data
            })
            
            dispatch(showNotification('Track Upload Successful'))
            
            setTimeout(() => {
                dispatch(hideNotification())
            }, 2000); 
        }
  
      }
      catch( err ){
        console.log( err )
      }
    }
    const editPlaylist = async (e: React.SyntheticEvent) => {}
    const deleteTrack =  async () => {
        console.log( 'deleting track')
        console.log( selectedTrack)

        try{
            const response = await httpclient.delete(`http://127.0.0.1:5000/dashboard/edit/playlist/upload?id=${selectedTrack.id}&&playlist_id=${selectedTrack.playlist_id}`)
            console.log( selectedTrack)
            console.log( response )
            
            if( response.status == 200){
                
                setModalOpen(false)

                const data = () => {
                    return response.data != null ? response.data : []
                }

                setPageData({
                    head: pageData!.head,
                    body: data
                })
                
                dispatch(showNotification('Track Delete Successful'))
            
                setTimeout(() => {
                    dispatch(hideNotification())
                }, 2000); 
            }
        }
        catch( err ){
            console.log( err)
        }
    }
    useEffect(() => {
      getPlaylistData()  
    },[])
  
    return(
      <>
        {
          pageData && 
          <div className="playlist_header">
              <div className="playlist_header" style={{'backgroundImage': `url(${ pageData?.head.imageurl})`}}>
                <div className="playlist_header_overlay">
                  <div className="playlist_header_item_container">
                    <div className="header_playlist_image" style={{backgroundImage: `url(${pageData?.head.imageurl})`}}/>
                    <button 
                      onClick={() => {
                        setModalOpen(true)
                        setModalForm('playlist')
                      }}
                    className='playlist_Edit_button'>Edit</button>
                  </div>
                  <div className="header_playlist_detail">
                    <div className="header_playlist_author_detail_container">
                      {/* <div className="header_playlist_author_image" style={{backgroundImage: `url(https://prophile.nyc3.digitaloceanspaces.com/images/${pageData?.head.author.imageURL}.jpg`}}/> */}
                      <div className="header_playlist_author_detail">
                          <span>{pageData?.head.title}</span>
                          <span>{pageData?.head.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>          
          </div>
          }
          
          <div className="uplod_moda_container" style={ modalOpen ? {'display': 'block'} : {'display': 'none'}}>
            {
              {
                "playlist": 
                  <div className="uplod_modal">
                    <h1>Edit Playlist</h1>
                    <form action="" onSubmit={(e: React.SyntheticEvent) => editPlaylist(e)}>
                        <label >Image</label>
                        <div className="file_upload">
                          <input 
                          type="file" 
                          name="image"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                          />
                          <span>Only jpg, jpeg file types are accepted  </span>
                          </div>
                        <label>Title</label>
                        <input 
                          type="text"
                          name="title" 
                          placeholder={pageData?.head.title}
                        />
                        <label >Genre</label>
                        <select value={pageData?.head.genre } name="genre">
                          <option value={'Hip-Hop'}>Hip-Hop</option>
                          <option value={'Rap'}>Rap</option>
                          <option value={'R&B'}>R&B</option>
                          <option value={'Alternative'}>Alternative</option>
                          <option value={'Indie'}>Indie</option>
                          <option value={'Jazz'}>Jazz</option>
                        </select>
                        <label >Type</label>
                        <select value={pageData?.head.type} disabled name="type"
                        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUploadType( e.currentTarget.value)}
                        >
                          <option value={'Single'}>Single</option>
                          <option value={'Playlist'}>Playlist</option>
                        </select>
                        <label >Category</label>
                        <select value={pageData?.head.category} name="category">
                          <option value={'Music'}>Music</option>
                          <option value={'Podcast'}>Podcast</option>
                        </select>
                        
                        <div className="form_button_container">
                          <button type="submit" className="button_positive">Update</button>
                          <div className="button_cancel" onClick={() => setModalOpen( false )}>Cancel</div>
                        </div>
                      </form>
                    </div>,   
                  "audio": <div className="uplod_modal">
                    <h1>Upload</h1>
                    <form action="" onSubmit={(e: React.SyntheticEvent) => uploadPlaylistTrack(e)}>
                        <label>Title</label>
                        <input 
                          type="text"
                          name="title" 
                          placeholder={pageData?.head.title}
                        />
                        <label >Genre</label>
                        <select value={pageData?.head.genre } name="genre">
                          <option value={'Hip-Hop'}>Hip-Hop</option>
                          <option value={'Rap'}>Rap</option>
                          <option value={'R&B'}>R&B</option>
                          <option value={'Alternative'}>Alternative</option>
                          <option value={'Indie'}>Indie</option>
                          <option value={'Jazz'}>Jazz</option>
                        </select>
                        <label >Type</label>
                        <select value={'Track'} disabled name="type"
                        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUploadType( e.currentTarget.value)}
                        >
                          <option value={'Single'}>Single</option>
                          <option value={'Playlist'}>Playlist</option>
                          <option value={'Track'}>Track</option>
                        </select>
                        <label >Category</label>
                        <select value={pageData?.head.category} name="category">
                          <option value={'Music'}>Music</option>
                          <option value={'Podcast'}>Podcast</option>
                        </select>
                        
                        <label>Audio File</label>
                        <div className="file_upload">
                        <input 
                          type="file" 
                          name="audio_file" 
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAudioFile(e.currentTarget.files![0])}
                        />
                        <span>Only mp3, wave file types are accepted. See usage guidelines for more details  <a href=""><i><BiInfoCircle/></i></a> </span>
                        </div>
                        
                        <div className="form_button_container">
                          <button type="submit" className="button_positive">Upload</button>
                          <div className="button_cancel" onClick={() => setModalOpen( false )}>Cancel</div>
                        </div>
                      </form>
                    </div>,
                  "delete": <div className="uplod_modal">
                    <h1>Delete Track</h1>
                    <span>Are you sure you want to  delete?</span>
                        <div className="form_button_container">
                          <button className="button_positive" onClick={() => deleteTrack() }>Delete</button>
                          <div className="button_cancel" onClick={() => setModalOpen( false )}>Cancel</div>
                        </div>
                    </div>
              }[modalForm]
            }
          </div>
          <div className="playlist_body_container">
                  { 
                    pageData && 
                      <div className="header_playlist_track_list">
                          <div className="sectionHeadingContainer">
                            <div className="trackSectionHeader">
                                <span className="section_subheading">Tracks</span>
                                <span className="section_subheading">{pageData?.body.length} Tracks</span>
                            </div>
                            <button onClick={() => {
                              setModalForm('audio')
                              setModalOpen(true)
                            }}><i><BsPlusCircle/></i></button>
                          </div>
                        {
                          pageData.body.length > 0 &&
                          pageData?.body.map( (item, count) =>{
                            return <PlaylistItem 
                                      key={count} 
                                      trackNum={count} 
                                      {...item}
                                      setModalForm={setModalForm}
                                      setSelectedTrack={setSelectedTrack}
                                      setModalOpen={setModalOpen}/>
                          } )
                        }
                      </div>
                  }
  
            </div>
      </>
    )
  }