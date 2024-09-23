import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAviPropType } from '../utils/ObjectTypes';

export default function UserAvi(props:UserAviPropType) {

    const navigate = useNavigate()
  
    const image = {
        backgroundImage: `url('${ props.imageURL})`
    }
  
    useEffect(()=> {
    },[])
  
    return (
      <div className="large_user_avi"
      onClick={() => navigate('/profile/0', {state: props, preventScrollReset: true})}>
        <img src={props.imageURL}
          className="user_avi"
        />
        <span>{props.username}</span>
      </div>
    );
  }
  