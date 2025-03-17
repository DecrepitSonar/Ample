import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAviPropType } from '../utils/ObjectTypes';

export default function UserAvi(props:UserAviPropType) {

    const navigate = useNavigate()
  
    const image = {
        backgroundImage: `url('${ props.imageURL})`
    }
  
    useEffect(()=> {},[])
  
    return (
      <div className="large_user_avi"
      onClick={() => navigate(`/user/${props.id}`, {state: props, preventScrollReset: true})}>
        <img src={`https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg`}
          className="user_avi"
        />
        <span>{props.username == undefined ? props.name : props.username}</span>
      </div>
    );
  }
  