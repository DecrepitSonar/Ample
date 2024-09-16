import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { auth, authState, AuthValues, login, AuthError } from '../../utils/Authslice'
import { rootState } from "../../utils/store";
import { redirect, useNavigation } from "react-router-dom";

function LoginForm() {

  const [ errorState, setErrorState ] = useState('')
  const [ formState, setFormState ] = useState({})

  const dispatch = useDispatch()
  const auths = useSelector(state => authState.getInitialState())


  const handleInput = (e) => {

    const {name, value } = e.currentTarget

    setFormState({
      ...formState,
      [name]: value
    })

    // console.log( formState)
  }
  const submit = (e) => {

    e.preventDefault()

    dispatch(login(formState))
    .then( response =>{
      const status = response.meta.requestStatus

      switch(status){
        case 'fulfilled': 
          redirect('/')
          break
        case 'rejected': 
          setErrorState('Username or password incorrect')
          break
        default:
          setErrorState('Internal Error, Try again')
          break
      }
    } )
    
  }

  useEffect(() => {
    if (auths.isLoggedIN ) redirect('/')
  })

    return (
      <div className="auth">
        <form action="/" method="post">
          <h1>Station 12</h1>
          <span className="auth_form_title">Sign in </span>
          <span className="auth_error_label"> </span>
          <label className="auth_form_username_label">Username</label>
          <input
            className="auth_form_username_input"
            type="text"
            name="email"
            placeholder="Email@email.com"
            onChange={(e) => { handleInput(e)}}/>
          <label className="auth_form_password_label">Passowrd</label>
          <input
            className="auth_form_password_input"
            type="password"
            name="password"
            placeholder="**************"
            onChange={(e) => { handleInput(e)}}

          />
          <button 
          className="auth_form_submit"
          onClick={(e) => submit(e) }>Submit</button>
          <span className="password_reset_label">Forgot your password?</span>
          <a href='/reset'className="password_reset_link">reset?</a>
          <span className="or_seperator_span">or</span>
          <a href="/signup"className="Login_form_sign_up">Sign up</a>
        </form>
      </div>
    );
  }
  
  export default LoginForm