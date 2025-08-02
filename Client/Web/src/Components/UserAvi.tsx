import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAviPropType } from '../utils/ObjectTypes';

export default function UserAvi(props:UserAviPropType) {

    const navigate = useNavigate()
  
    const image = {
        backgroundImage: `url('${ props.imageurl})`
    }
  
    useEffect(()=> {},[])
  
    return (
      <div className="large_user_avi"
      onClick={() => navigate(`/user/${props.id}`, {state: props, preventScrollReset: true})}>
        <img src={props.imageurl}
          className="user_avi"
        />
        <span>{props.username != undefined && props.username}</span>
      </div>
    );
  }
  