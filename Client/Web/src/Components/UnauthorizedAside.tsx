import React from "react";
import { Link } from "react-router-dom";

export default function UnauthorizedAside(){
    return(
          <div className="unauthorized_Aside_container">
            <Link to='/login' className="unauthorized_Aside_button">Sign in</Link>
          </div>
    )
}