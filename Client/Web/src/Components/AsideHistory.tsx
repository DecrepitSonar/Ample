import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import UnauthorizedAside from "./UnauthorizedAside";

export default function AsideHistory(){
    const auth = useSelector( ( state: RootState) => state.auth)

    return(
        auth.isLoggedIn ? 
        <span className="aside_section_title">History</span>
        : <UnauthorizedAside/>
)
}