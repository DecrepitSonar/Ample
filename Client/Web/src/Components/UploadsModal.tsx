import React, { SyntheticEvent, useEffect, useState } from "react";
import '/src/styles/DashStyles/dashstyles.css'
import { BiInfoCircle } from "react-icons/bi";
import httpclient from "../httpclient";

export default function UploadsModal (props: {
  uploadModal: Boolean, 
  setOpenUploadModal: React.Dispatch<React.SetStateAction<Boolean>>
}) {

  const [audioFile, setAudioFile] = useState<Blob>()
  const [imageFile, setImageFile] = useState<Blob>()

  const handleFormInput = async (e: SyntheticEvent ) => {
    
    e.preventDefault()

    const target = e.target as typeof e.target & {
      image: {value: Blob},
      title: {value: string},
      genre: {value: string},
      type: {value: string},
      category: {value: string},
      audio_file: {value: Blob}
    } 

    console.log( audioFile )
    console.log( imageFile )
    
    const form = new FormData()
    form.append('title', target.title.value)
    form.append('genre', target.genre.value)
    form.append('type', target.type.value)
    form.append('imageurl', imageFile! )
    // contentURL will be recieved after file upload to s3
    // imageURL will be recieved after file upload to s3
    form.append('category', target.category.value)
    form.append('audio_file', audioFile!)

    try{

      const response = httpclient.post('http://127.0.0.1:5000/', form)
      console.log( response )
    }
    catch(error){
      console.log(error)

    }

  }

  return(
    <div  style={props.uploadModal ? {'display':'block'} : {'display': 'none'} } className="uplod_moda_container">
        <div className="uplod_modal">
            <h1>Upload File</h1>
          <form action="" onSubmit={(e: React.SyntheticEvent) => handleFormInput(e)}>
            <label >Image</label>
            <div className="file_upload">
              <input 
              type="file" 
              name="image"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageFile(e.currentTarget.files![0])}
              />
              <span>Only jpg, jpeg file types are accepted  </span>
              </div>
            <label>Title</label>
            <input 
              type="text"
              name="title" 
              placeholder="Title"
            />
            <label >Genre</label>
            <select name="genre">
              <option value={'Hip-Hop'}>Hip-Hop</option>
              <option value={'Rap'}>Rap</option>
              <option value={'R&B'}>R&B</option>
              <option value={'Alternative'}>Alternative</option>
              <option value={'Indie'}>Indie</option>
              <option value={'Jazz'}>Jazz</option>
            </select>
            <label >Type</label>
            <select name="type">
              <option value={'Single'}>Single</option>
              <option value={'Playlist'}>Playlist</option>
            </select>
            <label >Category</label>
            <select name="category">
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
              <button type="submit" className="button_positive">upload</button>
              <div className="button_cancel" onClick={() => props.setOpenUploadModal( !props.uploadModal)}>cancel</div>
            </div>
          </form>
          </div>     
      </div>
  )
}