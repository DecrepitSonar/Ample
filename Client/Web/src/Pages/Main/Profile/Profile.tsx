// import React, {useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { RootState, useAppDispatch } from '../../../utils/store'
// import { IoAnalytics, IoHome, IoPerson } from 'react-icons/io5'
// import { BiLockAlt, BiShieldQuarter } from 'react-icons/bi'
// import { BsCreditCard2BackFill, BsUpload } from 'react-icons/bs'
// import { PiBellRingingFill } from 'react-icons/pi'
// import { CgEyeAlt } from 'react-icons/cg'

// import { Link, useNavigate } from 'react-router-dom'
// import ProfileHome from './ProfileHome'
// // import { getSettings } from '../../../utils/settingsSlice'
// import AccountSettings from './Settings/AccountSettings'
// import NotificationSettings from './Settings/Notifications'
// import PaymentSettings from './Settings/PaymentSettings'
// import PrivacySettings from './Settings/PrivacySettings'
// import SecuritySettings from './Settings/SecuritySettings'

// function SettingsPageWrapper(){

  
// export default function Profile() {

  
//     useEffect(() => {
//       // dispatch(getSettings())
//     })

//   return (
//     <>
//     { auth.isLoggedIn ? <SettingsPageWrapper/> : <div className='page_container'>Please Log in</div>}
//     </>
//   )
// }

// //  <section>
// //         <h1>Cards</h1>
// //         <div className='wallet_settings_content_item_container' >
// //           <div className='wallet_card_icon_container'>
// //             <div className='wallet_card_icon'>
// //               <IoCardSharp/>
// //             </div>
// //             <span>Mastercard</span>
// //           </div>
// //           <div className='wallet_card_detail_container'>
// //             <div className='wallet_card_data'> 
// //               <div className='wallet_card_data_identity'>

// //               <div className="wallet_card_data_input">
// //                 <label className="">NAME</label>
// //                 <input
// //                 className=""
// //                 type="text"
// //                 name="username"
// //                 placeholder='John'
// //                 disabled/>
// //               </div>

// //               <div className="wallet_card_data_input">
// //                 <label className="">SURNAME</label>
// //                 <input
// //                 className=""
// //                 type="text"
// //                 name="username"
// //                 placeholder='Doe'
// //                 disabled/>
// //               </div>
// //             </div>
// //             <div className='wallet_card_data_security'>

// //               <div className="wallet_card_data_input">
// //                 <label className="">CARD #</label>
// //                 <input
// //                 type="text"
// //                 name="username"
// //                 placeholder='********1234'
// //                 disabled
// //                 />
// //               </div>

// //               <div className="wallet_card_data_input">
// //                 <label className="">CVC</label>
// //                 <input
// //                 className=""
// //                 type="text"
// //                 name="username"
// //                 placeholder='***'
// //                 disabled/>
// //               </div>

// //               <div className="wallet_card_data_input">
// //                 <label className="">EXPIRY</label>
// //                 <input
// //                 className=""
// //                 type="text"
// //                 name="username"
// //                 placeholder='******'
// //                 disabled/>
// //               </div>

              
// //             </div>

// //             </div>
// //           </div>

          
// //         </div>
// //         <button className='wallet_add_card'>Add Card</button>
// //         <button className='submit_button_solid'>update</button>
// //       </section>