import React, { ChangeEventHandler, HtmlHTMLAttributes, useState } from "react";
import { useSelector } from "react-redux";
import { register } from "../../utils/Authslice";
import { redirect, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../utils/store";
import { AuthErrorType, RegistrationFormType } from "../../utils/ObjectTypes";
import { AuthValues } from "../../utils/ObjectFormats";
import { invalidFormStyle } from "../../utils/computedSyles";

function SignUpForm() {

  const [ errorState, setErrorState ] = useState('')
  const [ inputError, setInputError ] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const auths = useSelector( (state:RootState) => state.auth)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    console.log( 'submit')
    
    const target = e.target as typeof e.target & {
      email: {value: String},
      password: {value: String},
      confirmPassword: {value: String}
    } 

    try{
      await validateInput(target)
      setErrorState('')

      dispatch(
        register({
          email: target.email.value,
          password: target.password.value
      })).then( (response ) => {
        
        console.log(response )

        if( response.error ){
          console.log( response.error.message )

          switch( response.error.code){
            case 'ERR_BAD_REQUEST':
              setErrorState("User already exists")
              return

            default:
              return
          }
        } 

        // console.log( response.payload.data.id)
          window.localStorage.setItem('id', response.payload.data.id)

        console.log( 'success')
        setErrorState('')
        navigate('/login')
      })
      
    }catch( error ){
      console.log( 'error')
      // setErrorState(error)
    }

  }

  const validateInput = (target: RegistrationFormType) : Promise<String> => {
    return new Promise( (resolve, reject) => {
      const  {email, password, confirmPassword} = target

      if( password.value.length > 0 && email.value.length > 0 ){

        if( confirmPassword.value.length > 0){

          if (password.value == confirmPassword.value){ 
          setInputError(false) 
          console.log( 'resolved')
          resolve('')
          
          }else{
            setInputError(true)
            reject({
              message: 'Passwords do not match',
              Code: AuthValues.AuthError
            })
          }
        }
        else{
          setInputError(true)
          reject({
            message: 'Please fill in password fields',
            Code: AuthValues.PWError
          })
        }
      }else{
        reject({
          message: 'Please fill in all fields',
          Code: AuthValues.VoidInputError
        })
      }
      
    })      
  }

  
    return ( 
      <div className="auth">
        <form action="" method="post" onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
          <h1>Alto</h1>
          <span className="auth_form_title">Sign up</span>
          <span className="auth_error_label">{errorState}</span>
          <label className="auth_form_username_label">Email</label>
          <input
            className="auth_form_username_input"
            type="text"
            name="email"
            placeholder={"Email@email.com"}
            
          />
          <label className="form_password_label">Password</label>
          <input
            className="auth_form_password_input"
            type="password"
            name="password"
            placeholder={"***********"}
            style={errorState?.Coded == AuthValues.PWError || errorState?.Code == AuthValues.VoidInputError ? invalidFormStyle : {} }
          />
          <label className="form_password_label">Confirm Password</label>
          <input
            className="auth_form_password_input"
            type="password"
            name="confirmPassword"
            placeholder={"***********"}
            style={ errorState?.Code == AuthValues.PWError || errorState?.Code == AuthValues.VoidInputError ? invalidFormStyle : {} }
          />
          <button type="submit"
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