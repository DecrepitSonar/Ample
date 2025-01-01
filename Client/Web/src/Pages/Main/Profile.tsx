import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../utils/store'
import { IoCardSharp, IoHome, IoPerson } from 'react-icons/io5'
import { BiLockAlt, BiShield } from 'react-icons/bi'
import { BsCreditCard2BackFill } from 'react-icons/bs'
import { PiBellRingingFill } from 'react-icons/pi'
import { CgEyeAlt } from 'react-icons/cg'
import { RiImageCircleFill } from 'react-icons/ri'
import { logout, validate } from '../../utils/Authslice'
import { Navigate, useNavigate } from 'react-router-dom'
import ProfileHome from './ProfileHome'
import { AudioListItemPropType } from '../../utils/ObjectTypes'
import AudioListItem from '../../Components/AudioListItem'
import AudioItem from '../../Components/AudioItem'

function AccountSettings(){
  const user = useSelector( (state: RootState) => state.auth.user)
  return(
    <>
    <div className='settings_content_section'>
      <h1>Account</h1>
      <section>
        <span>EDIT AVI IMAGE</span>
        <div className='section_input_content'>

          <label className='custom_upload_buttom'>
            <RiImageCircleFill/>
            <input type="file" className='settings'/>
          </label>

          <img className='imageInputPreview' 
          src={user.imageURL}/>

        </div>
      </section>
      <section>
        <span>EDIT BANNER IMAGE</span>
        <div className='section_input_content'>

          <label className='custom_upload_buttom'>
            <RiImageCircleFill/>
            <input type="file" className='settings'/>
          </label>

          <img className='settings_banner_preview' 
          src={user.headerPosterURL}/>
          
        </div>
      </section>
      <section>
        <div className='section_input_content section_inputs'>
          <div className="settings_input_container">
            <label className="form_password_label">USERNAME</label>
            <input
            className="auth_form_password_input"
            type="text"
            name="username"
            placeholder={user.username}/>
          </div>
          </div>

        <div className='section_input_content section_inputs'>
          <div className="settings_input_container">
            <label className="form_password_label">EMAIL</label>
            <input
            className="auth_form_password_input"
            type="text"
            name="email"
            placeholder={"email212@email.com"}/>
          </div>
        </div>
        <button className='submit_button_solid'>Update</button>
      </section>

      <h1>Security</h1>
    <section>
        <div className='section_input_content section_inputs'>
          <div className="settings_input_container">
            <label className="form_password_label">CURRENT PASSWORD</label>
            <input
            className="auth_form_password_input"
            type="text"
            name="username"
            autoComplete='username'
            placeholder={'***************'}/>
          </div>
          </div>

        <div className='section_input_content section_inputs'>
          <div className="settings_input_container">
            <label className="form_password_label">NEW PASSWORD</label>
            <input
            className="auth_form_password_input"
            type="text"
            name="password"/>
          </div>
        </div>
        <button className='submit_button_solid'>Update</button>
      </section>

      <section>
        <h1>Creators</h1>
        <div className="section_input_content">
          <span>Upgrade your account to post, stream and earn from your content</span>
        </div>
        <button className='submit_button_outline'>Upgrade</button>
      </section>

      <section>
        <h1>Delete account</h1>
        <div className="section_input_content">
          <span>Remove your account and all your saved content.<br/>
          NOTE: YOU WILL LOSE YOUR REMAINING BALANCE</span> 
        </div>
        <button className='submit_button_outline_negative'>DELETE</button>
      </section>
    </div>
    </>
  )
}

function PaymentSettings(){

  const history = useSelector( (state: RootState) => state.audioPlayer.audioHistory)
  return(
    <div className='settings_content_section'>
      <h1>Payments</h1>
      <section>
        <h1>Balance</h1>
        <div className='settings_content_item_container' >
          <div className='settings_content_item'>
            <h1>999</h1>
            <span>Token</span>
          </div>
        </div>
      </section>

      <section>
        <h1>Cards</h1>
        <div className='wallet_settings_content_item_container' >
          <div className='wallet_card_icon_container'>
            <div className='wallet_card_icon'>
              <IoCardSharp/>
            </div>
            <span>Mastercard</span>
          </div>
          <div className='wallet_card_detail_container'>
            <div className='wallet_card_data'> 
              <div className='wallet_card_data_identity'>

              <div className="wallet_card_data_input">
                <label className="">NAME</label>
                <input
                className=""
                type="text"
                name="username"
                placeholder='John'
                disabled/>
              </div>

              <div className="wallet_card_data_input">
                <label className="">SURNAME</label>
                <input
                className=""
                type="text"
                name="username"
                placeholder='Doe'
                disabled/>
              </div>
            </div>
            <div className='wallet_card_data_security'>

              <div className="wallet_card_data_input">
                <label className="">CARD #</label>
                <input
                type="text"
                name="username"
                placeholder='********1234'
                disabled
                />
              </div>

              <div className="wallet_card_data_input">
                <label className="">CVC</label>
                <input
                className=""
                type="text"
                name="username"
                placeholder='***'
                disabled/>
              </div>

              <div className="wallet_card_data_input">
                <label className="">EXPIRY</label>
                <input
                className=""
                type="text"
                name="username"
                placeholder='******'
                disabled/>
              </div>

              
            </div>

            </div>
          </div>

          
        </div>
        <button className='wallet_add_card'>Add Card</button>
        <button className='submit_button_solid'>update</button>
      </section>

      <section>
        <h1>History</h1>
        <div className='wallet_settings_content_item_container'>
          <table className='wallet_settings_purchase_history'>
              <tr>
                <th>ITEM</th>
                <th>AMOUNT</th>
              </tr>
              
            <tbody>
              {
                history.map( (item: AudioListItemPropType)  => {
                  
                  return <tr>
                <td> <AudioListItem {...item} /></td>
                <td>-1k</td>
              </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function NotificationSettings(){
  return(
    <div className='settings_content_section'>
    <h1>Notifications</h1>
    </div>
  )
}

function PrivacySettings(){
  return(
    <div className='settings_content_section'>
    <h1>Privacy</h1>
    </div>
  )
}
function SettingsPageWrapper(){

  const [navLocation, setNavLocation ] = useState("Home")
  
  const dispatch = useAppDispatch()
  const userId = useSelector( (state: RootState) => state.auth.user.id)
  const navigator = useNavigate()

  const activeStyle = (link) => {
    return navLocation === link ? {
      color: 'rgb(198, 161, 104)', 
      backgroundColor: 'inherit'} : {}
  }

  const logoutUser = () => { 
    dispatch(logout())
    .then(() => {
      navigator('/')
    })
   }

  return(
    <div className='settings_page_container'>
      
      <div className='settings_nav'>
        <button style={activeStyle("Home")} onClick={((e) => setNavLocation('Home') )}><span style={activeStyle("Home")} className='settings_nav_icon'><IoHome/></span>Home</button>
        <button style={activeStyle("Account")} onClick={((e) => setNavLocation('Account') )}><span style={activeStyle("Account")} className='settings_nav_icon'><IoPerson/></span>Account</button>
        <button style={activeStyle("Payments")} onClick={((e) => setNavLocation('Payments') )}><span style={activeStyle("Payments")} className='settings_nav_icon'><BsCreditCard2BackFill/></span>Payments</button>
        <button style={activeStyle("Notifications")} onClick={((e) => setNavLocation('Notifications') )}><span style={activeStyle("Notifications")} className='settings_nav_icon'><PiBellRingingFill/></span>Notifications</button>
        <button style={activeStyle("Privacy")} onClick={((e) => setNavLocation('Privacy') )}><span style={activeStyle("Privacy")} className='settings_nav_icon'><CgEyeAlt/></span>Privacy</button>
        <button onClick={() => logoutUser()}> <span style={{color: "#d6000090", backgroundColor: 'inherit'}} className='settings_nav_icon'><BiLockAlt/></span>Sign out</button>
      </div>
      {/* <> */}
      {
          {
              "Home": <ProfileHome id={userId}/>,
              "Account": <AccountSettings/>,
              "Payments": <PaymentSettings/>,
              "Notifications": <NotificationSettings/>,
              "Privacy": <PrivacySettings/>
          }[navLocation]
      }
      {/* </> */}
    </div>
  )
}

export default function Profile() {
    const auth = useSelector( ( state: RootState ) => state.auth )

  return (
    <>
    { auth.isLoggedIn ? <SettingsPageWrapper/> : <div className='page_container'>Please Log in</div>}
    </>
  )
}
