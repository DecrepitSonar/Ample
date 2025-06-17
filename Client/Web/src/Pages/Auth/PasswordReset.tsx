import React from "react"

function PasswordReset(){
    return(
      <div className="auth">
        <form>
        <h1>Distrolog</h1>
          <span className="auth_form_title">Reset Password</span>
          <span className="auth_error_label">* Username or email does not exist</span>
          <label className="auth_form_username_label">Email</label>
          <input
            className="auth_form_username_input"
            type="text"
            placeholder={"Email@email.com"}
          />
          <button className="auth_form_submit">Submit</button>
          <span className="auth_link_reset">Didn't receive a link?</span>
          <a className="auth_link_reset_resend">Click here</a>
        </form>
        
      </div>
    )
  }

  export default PasswordReset