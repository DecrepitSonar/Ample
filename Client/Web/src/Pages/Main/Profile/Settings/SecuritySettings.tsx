import React from "react";

export default function SecuritySettings(){
    return(
      <div className='settings_content_section'>
      
      <section>
        <h1>Security</h1>
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
              <label className="form_password_label">New Password</label>
              <input
              className="auth_form_password_input"
              type="text"
              name="password"/>
            </div>
          </div>
          
          <div className='section_input_content section_inputs'>
            <div className="settings_input_container">
              <label className="form_password_label">Confirm Password</label>
              <input
              className="auth_form_password_input"
              type="text"
              name="password"/>
            </div>
          </div>

          <button className='submit_button_solid'>Update</button>
        </section>
        </div>
    )
  }