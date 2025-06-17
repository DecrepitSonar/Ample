import React, { ChangeEventHandler, HtmlHTMLAttributes, useState } from "react";
import { useSelector } from "react-redux";
import { register } from "../../utils/Authslice";
import { redirect, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../utils/store";
import { AuthErrorType, RegistrationFormType } from "../../utils/ObjectTypes";
import { AuthValues } from "../../utils/ObjectFormats";
import { invalidFormStyle } from "../../utils/computedSyles";

function SignUpForm() {

  const [ errorState, setErrorState ] = useState<AuthErrorType>()
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

    const formdata = {
      email: target.email.value,
      password: target.password.value,
      confirmPassword: target.confirmPassword.value
    } as RegistrationFormType
    

    try{
      await validateInput(formdata)
      setErrorState({
            message: '',
            Code: ''
      })

      dispatch(
        register({
          email: target.email.value,
          password: target.password.value
      })).then( (response ) => {

        const payload = response.payload.data

        if( payload.error ){
          const message = payload.error.message
          setErrorState({
            message: message,
            Code: AuthValues.EMailError
          })
          return
        } 

        console.log( payload)
        setErrorState({
          message: '',
          Code: ''
        })
        navigate(`/userdetailedits/${payload}`)
      })
      
    }catch( error ){
      console.log( error )
      
      const message = error.message

      setErrorState({
        message: message,
        Code: AuthValues.PWError
      })
    }

  }

  const validateInput = (target: RegistrationFormType) : Promise<String> => {
    return new Promise( (resolve, reject) => {
      const  {email, password, confirmPassword} = target

      if( password.length > 0 && email.length > 0 ){

        if( confirmPassword.length > 0){

          if (password == confirmPassword){ 
            setInputError(false) 
            console.log( 'resolved')
            resolve('')  
          }

          else{
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
          <h1>Distrolog</h1>
          <span className="auth_form_title">Sign up</span>
          <span className="auth_error_label">{errorState?.message}</span>
          <label className="auth_form_username_label">Email</label>
          <input
            className="auth_form_username_input"
            type="text"
            name="email"
            placeholder={"Email@email.com"}
            style={errorState?.Code == AuthValues.EMailError || errorState?.Code == AuthValues.VoidInputError ? invalidFormStyle : {} }
            
          />
          <label className="form_password_label">Password</label>
          <input
            className="auth_form_password_input"
            type="password"
            name="password"
            placeholder={"***********"}
            style={errorState?.Code == AuthValues.EMailError || 
              errorState?.Code == AuthValues.VoidInputError ||
              errorState?.Code == AuthValues.PWError? invalidFormStyle : {} }
          />
          <label className="form_password_label">Confirm Password</label>
          <input
            className="auth_form_password_input"
            type="password"
            name="confirmPassword"
            placeholder={"***********"}
            style={ 
              errorState?.Code == AuthValues.EMailError || 
              errorState?.Code == AuthValues.VoidInputError ||
              errorState?.Code == AuthValues.PWError ? invalidFormStyle : {} }
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