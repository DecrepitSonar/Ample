import React, { useState } from "react";
import { Form } from "react-router-dom";
import { useAppDispatch } from "../../../../utils/store";
import { updateSecurityPreferences } from "../../../../utils/settingsSlice";

type formFieldTypes = {
  password: string, 
  newPassword: string, 
  confirmPassword: string
}

type formError = {
    type: string,
    fields: string[],
    message: string
}

export default function SecuritySettings(){

  const [inputError, setInputError ] = useState<formError>()
  const  [formFields, setFormFields ] = useState<formFieldTypes>()

  const dispatch = useAppDispatch() 

  const validateInput = (fields: formFieldTypes) : Promise<String> => {
      return new Promise( (resolve, reject) => {
  
        setInputError(undefined) 

        const error: formError = 
        {
          'type': 'empty',
          'fields': ['password', 'newPassword', 'confirmPassword'],
          'message': 'Please fill in all fields'
        }

        if (formFields != undefined){
          
          console.log( Object.keys(formFields) )

          Object.keys(formFields).forEach( (key, index) => {
            console.log( key )
            
            error.fields.filter((item, index, items) => {
              if (item == key){
                items.splice(index, 1)
              }
            })

            if( formFields[key].length < 1){
              error.fields.push(key)
              setInputError(error)
            }

          });

          if(error.fields.length > 0){
            setInputError(error)
            reject(error.message)
          }

          if(fields.newPassword != fields.confirmPassword){
            error.fields.push('newPassword', 'confirmPassword')
            error.message = 'new Password fields must match '
            setInputError(error)
            reject(error.message)
          }

        }
        else{

          setInputError( error)
          reject(error.message)

        }

        resolve('')
      })
    }

  const handleInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const inputName =  e.currentTarget.name
    console.log( inputName)

    setFormFields({
      ...formFields,
      [inputName]: e.currentTarget.value
    })
  }

  const validateField = (name: string) => {
    return inputError?.fields.find(
      (item) => { 
        return item == name ? true : false   
      })
  }

  const handleInputsubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try{
      await validateInput(formFields!)

      // const form = new FormData()/
      // form.append('password',  )
      // form.append('newPassword', formFields?.newPassword! )

      const data = {
        'password': formFields?.password!, 
        'newPassword': formFields?.newPassword!
      }

      await dispatch(updateSecurityPreferences( data ))

    }
    catch( err){
      console.log( err )
    }
  }

    return(
      <form onSubmit={handleInputsubmit} className='settings_content_section'>
        
      <h1>Security</h1>
      <section>
          <div className='section_input_content section_inputs'
          style={ validateField('password') ? { 'border': '1px solid red'} : {}  }>
            <div className="settings_input_container">
              <label className="form_password_label">CURRENT PASSWORD</label>
              <input
              className="auth_form_password_input"
              type="password"
              name="password"
              autoComplete='username'
              onChange={(e:  React.ChangeEvent<HTMLInputElementd>) => handleInput( e )}
              placeholder={'***************'}/>
            </div>
            </div>
  
          <div className='section_input_content section_inputs'
           style={ validateField('newPassword') 
            ? { 'border': '1px solid red'} : {}  }>
            <div className="settings_input_container">
              <label className="form_password_label">New Password</label>
              <input
              className="auth_form_password_input"
              type="password"
              onChange={(e:  React.ChangeEvent<HTMLInputElementd>) => handleInput( e )}
              name="newPassword"/>
              
            </div>
          </div>
          
          <div className='section_input_content section_inputs'
          style={ validateField('confirmPassword') 
            ? { 'border': '1px solid red'} : {}  }
            >
            <div className="settings_input_container">
              <label className="form_password_label">Confirm Password</label>
              <input
              className="auth_form_password_input"
              type="password"
              onChange={(e:  React.ChangeEvent<HTMLInputElementd>) => handleInput( e )}
              name="confirmPassword"
              />
            </div>
          </div>

          <button className='submit_button_solid'>Update</button>
        </section>
        </form>
    )
  }