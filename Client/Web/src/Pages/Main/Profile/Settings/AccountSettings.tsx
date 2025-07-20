import React, { useEffect, useRef, useState } from "react";
import { RiImageCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { setUser, validate } from "../../../../utils/Authslice";
import { 
  getUserAccount, 
  setAccountSettings, 
  updateAccountPreferences, 
  updgradeUser
} from "../../../../utils/settingsSlice";
import { RootState, useAppDispatch } from "../../../../utils/store";
import { Link } from "react-router-dom";
import { hideNotification, showNotification } from "../../../../utils/notificationSlice";

export default function AccountSettings(){
  
    const accountSettings = useSelector( ( state: RootState) => state.settings.accountSettings)
    const user = useSelector( (state: RootState) => state.auth.user)
    const imgRef = useRef<HTMLImageElement>(null)
    const headerImgRef = useRef<HTMLImageElement>(null)
  
    const [ profileImageFile, setFile ] = useState<Blob>()
    const [ headerFile, setHeaderFile ] = useState<Blob>()
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
  
    const dispatch = useAppDispatch()
  
    useEffect( () => {
      
      
      ( async () => {
        console.log('useEffect')
        console.log( accountSettings)
        if( Object.keys(accountSettings).length > 0){
          console.log( accountSettings )
          return 
        }
  
        try{
          
          const response = await dispatch(getUserAccount())
          
          if( response.payload != undefined ){
            const data =  response.payload.data
            dispatch( setAccountSettings(data) )
          }
  
        }
        catch( error){
          console.log( error )
        }
      })()
      
    },[])
    
    const handleSeletedImage = (e: React.SyntheticEvent) => {
    
      const reader = new FileReader()
  
      const input_name = e.currentTarget.name
  
      // const blob = new Blob([JSON.stringify(e.currentTarget.files[0])], { type: 'application/json'})
  
      if( input_name === 'profile-header-image' ){
  
        setHeaderFile(e.currentTarget.files[0])
  
        reader.onload =(e: ProgressEvent<FileReader>) => {
          headerImgRef.current.src = e.target?.result
        }
  
        reader.readAsDataURL(e.currentTarget.files[0])
  
        return
      }
  
      setFile(e.currentTarget.files[0])
  
      reader.onload =(e: ProgressEvent<FileReader>) => {
        imgRef.current.src = e.target?.result
      }
  
      reader.readAsDataURL(e.currentTarget.files[0])
    }
  
    const handleSubmit =  async ( e: React.SyntheticEvent ) => {
      e.preventDefault()
      console.log( 'run')
      
      // const data = {
      //   profileImage: profileImageFile, 
      //   headerImage: headerFile, 
      //   username: username
      // }
  
      
      // console.log(blob )
      // console.log(typeof(profileImageFile) )
  
      const formData = new FormData()
      formData.append('username', username || accountSettings.username)
      formData.append('headerimage', headerFile || accountSettings.headerimage)
      formData.append('profileimage', profileImageFile || accountSettings.profileImage)
      formData.append('email', email || accountSettings.email)
  
      try{
            await dispatch( updateAccountPreferences(formData) )
            .then( response => { 
              window.localStorage.clear()
              dispatch(validate()) 
            })
      }   
      catch( error ){ console.log( error ) }
      
    }
  
    const handleUserUpgrade = async () => {
      try {
        const response = await dispatch(updgradeUser())
        console.log( response )
        if (response.payload.status == 200){

          dispatch(setUser(response.payload.data))
          dispatch(showNotification('Your account has been upgraded'))

          setTimeout(() => {
            dispatch(hideNotification())
          }, 2000); 
        }
      } catch (error) {
        console.log( error )
      }
    }
    return(
      <>
        {
          Object.keys(accountSettings).length > 0 &&
          <div className='settings_content_section'>
        
            <h1>Account</h1>
        <form action=""method='put' onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)} >
          <div className="settings_input_section">
            <>
            <div className='section_input_content'>
            {/* <span>Avatar Image</span> */}
  
              <label className='custom_upload_buttom'>
                <input
                type="file" 
                name='profile-image' 
                onChange={(e: React.SyntheticEvent) => handleSeletedImage(e)}/>
                <RiImageCircleFill/>
              </label>
  
              <img className='imageInputPreview' 
              ref={imgRef}
              src={accountSettings.profileImage}/>
  
            {/* <span>Banner Image</span> */}
  
              <label className='custom_upload_buttom'>
                <input 
                type="file" 
                name='profile-header-image' 
                onChange={(e: React.SyntheticEvent) => handleSeletedImage(e)}
                /> <RiImageCircleFill/></label>
  
              <img className='imageInputPreview' 
              ref={headerImgRef}
              src={accountSettings.headerimage}/>
              
            </div>
            </>
            
          </div>
          <>
            <div className='section_input_content section_inputs'>
              <div className="settings_input_container">
                <label className="form_password_label">Username</label>
                <input
                className="auth_form_password_input"
                type="text"
                name="username"
                onChange={(e) => setUsername(e.currentTarget.value)}
                placeholder={accountSettings.username}/>
              </div>
              </div>
           
            <div className='section_input_content section_inputs'>
              <div className="settings_input_container">
                <label className="form_password_label">Email</label>
                <input
                className="auth_form_password_input"
                type="text"
                name="username"
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder={accountSettings.email}/>
              </div>
              </div>
  
            <button className='submit_button_solid' type='submit'>Update</button>
          </>
        </form>
  
          {
            user.accounttype != 'creator' && 
            <section>
              <h2>Creators</h2>
              <div className="section_input_content">
                <span>Upgrade your account to post, stream and earn from your content</span>
              </div>
              <button 
              onClick={() => handleUserUpgrade()}
              className='submit_button_outline'>Upgrade</button>
            </section>
          }
  
        <section>
          <h2>Delete account</h2>
          <div className="section_input_content">
            <span>Remove your account and all your saved content.<br/>
            NOTE: YOU WILL LOSE YOUR REMAINING BALANCE</span> 
          </div>
          <button className='submit_button_outline_negative'>DELETE</button>
        </section>
      </div>
        }
      </>
    )
  }

function upgradeUserProviliges(): any {
  throw new Error("Function not implemented.");
}
