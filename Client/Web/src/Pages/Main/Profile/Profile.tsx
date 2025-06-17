import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../utils/store'
import { IoAnalytics, IoHome, IoPerson } from 'react-icons/io5'
import { BiLockAlt, BiShieldQuarter } from 'react-icons/bi'
import { BsCreditCard2BackFill, BsUpload } from 'react-icons/bs'
import { PiBellRingingFill } from 'react-icons/pi'
import { CgEyeAlt } from 'react-icons/cg'
import {logout, logOutUser } from '../../../utils/Authslice'
import { replace, useNavigate } from 'react-router-dom'
import ProfileHome from './ProfileHome'
import { getSettings } from '../../../utils/settingsSlice'
import AccountSettings from './Settings/AccountSettings'
import NotificationSettings from './Settings/Notifications'
import PaymentSettings from './Settings/PaymentSettings'
import PrivacySettings from './Settings/PrivacySettings'
import SecuritySettings from './Settings/SecuritySettings'

function SettingsPageWrapper(){

  const [navLocation, setNavLocation ] = useState("Home")
  
  const dispatch = useAppDispatch()
  const user = useSelector( (state: RootState) => state.auth.user)
  const navigator = useNavigate()

  const activeStyle = (link) => {
    return navLocation === link ? {
      color: '#ddd', 
      backgroundColor: 'rgba(198, 161, 104,0.5)'} : {}
  }

  const logoutUser = () => { 
    dispatch(logout())
    .then(() => {
      dispatch(logOutUser(null))
      navigator('/')
    })
   }

  return(
    <div className='settings_page_container'>
      
      <div className='settings_nav'>
        <button style={activeStyle("Home")} onClick={((e) => setNavLocation('Home') )}>
          <span  className='settings_nav_icon'><IoHome/></span>Home</button>
        <button style={activeStyle("Account")} onClick={((e) => setNavLocation('Account') )}>
          <span className='settings_nav_icon'><IoPerson/></span>Account</button>
        {
          user.accounttype == 'Creator' && 
          <>
            <button style={activeStyle("Uploads")} onClick={((e) => setNavLocation('Uploads') )}>
              <span className='settings_nav_icon'><BsUpload/></span>Uploads</button>
            <button style={activeStyle("Analytics")} onClick={((e) => setNavLocation('Analytics') )}>
              <span className='settings_nav_icon'><IoAnalytics/></span>Analytics</button>
          </>
        }
        <button style={activeStyle("Payments")} onClick={((e) => setNavLocation('Payments') )}>
          <span className='settings_nav_icon'><BsCreditCard2BackFill/></span>Payments</button>
        <button style={activeStyle("Security")} onClick={((e) => setNavLocation('Security') )}>
          <span className='settings_nav_icon'><BiShieldQuarter/></span>Security</button>
        <button style={activeStyle("Notifications")} onClick={((e) => setNavLocation('Notifications') )}>
          <span  className='settings_nav_icon'><PiBellRingingFill/></span>Notifications</button>
        <button style={activeStyle("Privacy")} onClick={((e) => setNavLocation('Privacy') )}>
          <span className='settings_nav_icon'><CgEyeAlt/></span>Privacy</button>
        <button onClick={() => logoutUser()}> 
          <span style={{color: "#d6000090"}} className='settings_nav_icon'><BiLockAlt/></span>Sign out</button>
      </div>
      {/* <> */}
      {
          {
              "Home": <ProfileHome/>,
              "Account": <AccountSettings/>,
              "Security": <SecuritySettings/>,
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

    const payments = useSelector( (state: RootState) => state.settings.paymentSettings)

    const dispatch = useAppDispatch() 
  
    useEffect(() => {
      dispatch(getSettings())
    })

  return (
    <>
    { auth.isLoggedIn ? <SettingsPageWrapper/> : <div className='page_container'>Please Log in</div>}
    </>
  )
}

//  <section>
//         <h1>Cards</h1>
//         <div className='wallet_settings_content_item_container' >
//           <div className='wallet_card_icon_container'>
//             <div className='wallet_card_icon'>
//               <IoCardSharp/>
//             </div>
//             <span>Mastercard</span>
//           </div>
//           <div className='wallet_card_detail_container'>
//             <div className='wallet_card_data'> 
//               <div className='wallet_card_data_identity'>

//               <div className="wallet_card_data_input">
//                 <label className="">NAME</label>
//                 <input
//                 className=""
//                 type="text"
//                 name="username"
//                 placeholder='John'
//                 disabled/>
//               </div>

//               <div className="wallet_card_data_input">
//                 <label className="">SURNAME</label>
//                 <input
//                 className=""
//                 type="text"
//                 name="username"
//                 placeholder='Doe'
//                 disabled/>
//               </div>
//             </div>
//             <div className='wallet_card_data_security'>

//               <div className="wallet_card_data_input">
//                 <label className="">CARD #</label>
//                 <input
//                 type="text"
//                 name="username"
//                 placeholder='********1234'
//                 disabled
//                 />
//               </div>

//               <div className="wallet_card_data_input">
//                 <label className="">CVC</label>
//                 <input
//                 className=""
//                 type="text"
//                 name="username"
//                 placeholder='***'
//                 disabled/>
//               </div>

//               <div className="wallet_card_data_input">
//                 <label className="">EXPIRY</label>
//                 <input
//                 className=""
//                 type="text"
//                 name="username"
//                 placeholder='******'
//                 disabled/>
//               </div>

              
//             </div>

//             </div>
//           </div>

          
//         </div>
//         <button className='wallet_add_card'>Add Card</button>
//         <button className='submit_button_solid'>update</button>
//       </section>