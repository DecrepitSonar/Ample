import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAviPropType } from '../utils/ObjectTypes';

export default function UserAvi(props:UserAviPropType) {

    const navigate = useNavigate()
  
    const image = {
        backgroundImage: `url('../../public/${ props.imageURL})`
    }
  
    useEffect(()=> {
    },[])
  
    return (
      <div className="large_user_avi"
      onClick={() => navigate('/profile/0', {state: props, preventScrollReset: true})}>
        <div
          className="user_avi"
          style={image}
        ></div>
        <span>{props.username}</span>
      </div>
    );
  }
  