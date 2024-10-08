import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../utils/store'
import { IoCardSharp, IoPerson } from 'react-icons/io5'
import { BiLockAlt, BiShield } from 'react-icons/bi'
import { BsCreditCard2BackFill } from 'react-icons/bs'
import { PiBellRingingFill } from 'react-icons/pi'
import { CgEyeAlt } from 'react-icons/cg'
import { RiImageCircleFill } from 'react-icons/ri'
import { logout } from '../utils/Authslice'
import { useNavigate } from 'react-router-dom'

function AccountSettings(){
  const user = useSelector( (state: RootState) => state.auth.user)
  return(
    <>
    <div className='settings_content_section'>
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

function SecuritySettings(){
  return(
    <>
    <div className='settings_content_section'>
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
    </div>
    </>
  )
}

function PaymentSettings(){
  return(
    <div className='settings_content_section'>
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
                <th>DATE</th>
              </tr>
              
            <tbody>
              <tr>
                <td>East Atlanta love letter</td>
                <td>-1k</td>
                <td>Feb 4, 24, 2:2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function NotificationSettings(){
  return(
    <></>
  )
}

function PrivacySettings(){
  return(
    <></>
  )
}
function SettingsPageWrapper(){

  const [navLocation, setNavLocation ] = useState("Account")
  
  const dispatch = useAppDispatch()
  const useId = useSelector( (state: RootState) => state.auth.user.id)
  const navigator = useNavigate()

  const activeStyle = (link) => {
    return navLocation === link ? {
      color: 'rgb(198, 161, 104)', 
      backgroundColor: 'inherit'} : {}
  }

  const logoutUser = () => {
    dispatch(logout(useId))
    .then( () => {
        navigator('/')
    })
  }

  return(
    <div className='settings_page_container'>
      
      <div className='settings_header'>
      <ul className='settings_nav'>
        <li style={activeStyle("Account")} onClick={((e) => setNavLocation('Account') )}>
          <div style={activeStyle("Account")} className='settings_nav_icon'><IoPerson/>
          </div>Account</li>
        <li style={activeStyle("Security")} onClick={((e) => setNavLocation('Security') )}>
          <div style={activeStyle("Security")} className='settings_nav_icon'><BiShield/></div>Security</li>
        <li style={activeStyle("Payments")} onClick={((e) => setNavLocation('Payments') )}>
          <div style={activeStyle("Payments")} className='settings_nav_icon'><BsCreditCard2BackFill/></div>Payments</li>
        <li style={activeStyle("Notifications")} onClick={((e) => setNavLocation('Notifications') )}>
          <div style={activeStyle("Notifications")} className='settings_nav_icon'><PiBellRingingFill/></div>Notifications</li>
        <li style={activeStyle("Privacy")} onClick={((e) => setNavLocation('Privacy') )}>
          <div style={activeStyle("Privacy")} className='settings_nav_icon'><CgEyeAlt/></div>Privacy</li>
        <li onClick={() => logoutUser()}> <div style={{color: "#d6000090", backgroundColor: 'inherit'}} className='settings_nav_icon'><BiLockAlt/></div>Sign out</li>
      </ul>
      </div>
      <>
      {
          {
              "Account": <AccountSettings/>,
              "Security": <SecuritySettings/>,
              "Payments": <PaymentSettings/>,
              "Notifications": <NotificationSettings/>,
              "Privacy": <PrivacySettings/>
          }[navLocation]
      }
      </>
    </div>
  )
}

export default function Settings() {
    const auth = useSelector( ( state: RootState ) => state.auth )

    console.log( auth)

  return (
    <>
    { auth.isLoggedIn ? <SettingsPageWrapper/> : <>Please Log in</>}
    </>
  )
}
