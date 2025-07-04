import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { authState, login } from '../../utils/Authslice'
import { setSavedTracks } from "../../utils/mediaPlayerSlice";
import {useAppDispatch } from "../../utils/store"
import { redirect, useNavigate } from "react-router-dom"
import { AuthValues } from "../../utils/ObjectFormats";
import { AuthErrorType, LoginFormType, RegistrationFormType } from "../../utils/ObjectTypes";
import { invalidFormStyle } from "../../utils/computedSyles";
import { setLibraryItems } from "../../utils/librarySlice";


function LoginForm() {

  const [ errorState, setErrorState ] = useState<AuthErrorType>()
  const [ inputError, setInputError ] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const auths = useSelector(state => authState.getInitialState())

  const navigate = useNavigate()

  const handleInput = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    console.log( 'submit')
    
    const target = e.target as typeof e.target & {
      email: {value: String},
      password: {value: String},
      confirmPassword: {value: String}
    } 

    const formdata = {
      email: target.email.value,
      password: target.password.value
    } as LoginFormType

    

    try{
      
      await validateInput(formdata)
      console.log( formdata )
      const response = await dispatch(login(formdata))

      console.log( response )
      if( response.payload == undefined){
        setErrorState({
          message: "Internal Error Try again",
          Code: 'SrvErr'
        })
        return
      }

      if( response.payload.data.error != undefined){

        const message = response.payload.data.error.message 
        const code = response.payload.data.error.errorCode 
        
        setErrorState({
          message: message,
          Code: AuthValues.AuthError
        }) 
        return 
      }

      navigate('/')

    }catch( error ){
      setErrorState(error as AuthErrorType)
    }


  }

    // Refactor: 
    // Get function should recieve and object from input form 
    // Check if each value is empty
    // resolve all keys not empty
    // Move to utils for reuse
    
  const validateInput = (target: LoginFormType) : Promise<String> => {
    return new Promise( (resolve, reject) => {
      const  {email, password} = target

      if( password.length > 0 && email.length > 0 ){
        resolve('')
      }
      else{
        reject({
          message: 'Please fill in al Fields',
          // Create new case for input error seperate from Auth errors
          Code: AuthValues.VoidInputError
        })    
      }
    })
  }

  useEffect(() => {
    if (auths.isLoggedIn ) navigate('/')
  })

    return (
      <div className="auth">
        <form action="/" method="post" onSubmit={(e: React.SyntheticEvent) => handleInput(e)}> 
          <h1>Distrolog</h1>
          <span className="auth_form_title">Sign in </span>
          <span className="auth_error_label">{errorState?.message} </span>
          <label className="auth_form_username_label">Username</label>
          <input
            className="auth_form_username_input"
            type="text"
            name="email"
            placeholder="Email@email.com"
            style={errorState?.Code == AuthValues.VoidInputError || errorState?.Code == AuthValues.AuthError ? invalidFormStyle : {} }
            />
          <label className="auth_form_password_label">Password</label>
          <input
            className="auth_form_password_input"
            type="password"
            name="password"
            placeholder="**************"
            style={errorState?.Code == AuthValues.PWError || errorState?.Code == AuthValues.VoidInputError || errorState?.Code == AuthValues.AuthError ? invalidFormStyle : {} }
          />
          <button 
          className="auth_form_submit"
          type="submit"
          >Submit</button>
          <span className="password_reset_label">Forgot your password?</span>
          <a href='/reset'className="password_reset_link">reset?</a>
          <span className="or_seperator_span">or</span>
          <a href="/signup"className="Login_form_sign_up">Sign up</a>
        </form>
      </div>
    );
  }
  
  export default LoginForm