import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { rootState } from "../../utils/store";
import { register } from "../../utils/Authslice";

function SignUpForm() {

  const [ errorState, setErrorState ] = useState({})
  const [ formState, setFormState ] = useState({})
  const [ inputValid, setValidInput ] = useState(null)

  const dispatch = useDispatch()
  const auths = rootState.auth

  const handleInput = (e) => {

    const {name, value } = e.currentTarget

    validatePasswordInput(name, value)

    setFormState({
      ...formState,
      [name]: value
    })


  }

  const validatePasswordInput = (name, value) => {
    if( name == 'password'){

      if( formState.confirmPassword != ''){
        value == formState.confirmPassword ? setValidInput(true) : setValidInput(false)
      }
      else{
        setValidInput(null)
      }
    }
      
    

    if( name == 'confirmPassword'){

      if( value != ''){
        value == formState.password ? setValidInput(true) : setValidInput(false)
      }
      else{
        setValidInput(null)
      }
    }
  }

  const submit = (e) => {

    e.preventDefault()
    console.log( "submit")

    console.log( formState)
    dispatch(register(formState))
    
  }

  const validFormStyle = {
    border: ' 1px solid #21A400'
  }
  const invalidFormStyle = {
    border: '1px solid #D60000'
  }
  
    return ( 
      <div className="auth">
        <form action="" method="post">
          <h1>Station 12</h1>
          <span className="auth_form_title">Sign up</span>
          <span className="auth_error_label">{inputValid == false && inputValid != null ? '* Passwords do not match' : ''  }</span>
          <label className="auth_form_username_label">Email</label>
          <input
            className="auth_form_username_input"
            type="text"
            name="email"
            placeholder={"Email@email.com"}
            onChange={(e) => handleInput(e)}
          />
          <label className="form_password_label">Password</label>
          <input
            className="auth_form_password_input"
            type="password"
            name="password"
            placeholder={"***********"}
            onChange={(e) => handleInput(e)}
            style={ formState.confirmPassword != null ?
              inputValid ? validFormStyle : invalidFormStyle : {'':''} }
          />
          <label className="form_password_label">Confirm Password</label>
          <input
            className="auth_form_password_input"
            type="password"
            name="confirmPassword"
            placeholder={"***********"}
            onChange={(e) => handleInput(e)}
            style={ formState.confirmPassword != null ?
              inputValid ? validFormStyle : invalidFormStyle : {'':''} }
          />
          <button 
          onClick={(e) => submit(e)}
          className="auth_form_submit">Submit</button>
          <span>Already have an account?</span>
          <a href="login">Sign in Here</a>
          <p>
            By using this platform you consent to collection and use of your
            personal information
          </p>
          <span>
            Read our <a>Terms of service </a> for more information{" "}
          </span>
        </form>
      </div>
    );
  }

  export default SignUpForm