import React, { useEffect, useId, useRef, useState } from "react";
import '../../styles/AuthStyles.css'
import { FaImage, FaRegImage } from "react-icons/fa";
import { FaImagePortrait, FaImages } from "react-icons/fa6";
import { RiImageCircleFill } from "react-icons/ri";
import axios from "axios";
import { invalidFormStyle, validFormStyle } from "../../utils/computedSyles";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../utils/store";
import { updatePreferences } from "../../utils/settingsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { addUserDetail, validate } from "../../utils/Authslice";

function SignUpEditForm() {

  const [ errorState, setErrorState ] = useState('')
  const [ usernameAvailable, setusernameAvailable ] = useState<boolean>(false)
  const [ file, setFile ] = useState<Blob>()

  const dispatch = useAppDispatch()
  const auth = useSelector( (state: RootState) => state.auth)

  const imgRef = useRef()
  const navigate = useNavigate()
  const params = useParams()

  const handleSeletedImage = (file: Blob) => {
    const reader = new FileReader()
    setFile(file)

    reader.onload =(e) => {
        imgRef.current.src = e.target?.result
    }

    reader.readAsDataURL(file)

  }

  const handleSubmit = async (e: React.SyntheticEvent ) => {
    e.preventDefault()

    
    const target = e.target as typeof e.target & {
        username: {value: string},
        image: {value: string}
    }

    const userId = params['id']

    const formdata = new FormData()
    formdata.set ('id', userId as string )
    formdata.append( 'username', target.username.value)
    formdata.append('profileImage', file)

    formdata.forEach( item => [
        console.log( item)
    ])

    try{
        await dispatch( 
            addUserDetail(formdata)
        )
        .then( response => {
            // console.log( response )
            // const error = response.payload!.data.error
            // if( error){
            //     setusernameAvailable(false)
            //     setErrorState(error)
            //     return
            // }
            // // setErrorState({})
            // setusernameAvailable(true)
            navigate('/login')
        })
    }   
    catch( error ){
        console.log( error )
    }
  }


    return ( 
        <div className="auth">
            <form action="" method="post" onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
                <h1>AVi</h1>
                <h2 className="auth_form_username_label">Edit Details</h2>
                <div className="image_Upload_section">
                    <img className="imageInputPreview" src="https://prophile.nyc3.cdn.digitaloceanspaces.com/images/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" width={'170px'} ref={imgRef}/>
                    <label className="custom_upload_buttom">
                        <input className=""type="file" onChange={(e) => handleSeletedImage(e.target.files[0])}/>
                        <i><RiImageCircleFill/></i>
                    </label>
                </div>
                <span className="auth_error_label">{errorState}</span>
                <label className="form_password_label">Username</label>
                <input
                className="auth_form_password_input"
                type="text"
                name="username"
                placeholder={"username234"}
                style={ usernameAvailable  ? validFormStyle :  errorState != '' ? invalidFormStyle : {} }/>
                <button type="submit" className="auth_form_submit">Submit</button>
            </form>
        </div>
    );
    }

export default SignUpEditForm