import React from "react";
import MediumUserListItem from "./MediumUserListItem";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import UnauthorizedAside from "./UnauthorizedAside";

export default function AsideSubscriptions() {

    const auth = useSelector( ( state: RootState) => state.auth)
  
    const Subscriptions = [
      {
        "artist": "Anderson .Paak",
        "imageURL": "andersonpaak.jpg"
      },
      {
        "artist": "NxWorries",
        "imageURL": "yeslawd.jpg"
      },
  
      {
        "artist": "Knowledge",
        "imageURL": "knx.jpg"
      },
      {
        "artist": "Knowledge",
        "imageURL": "knx.jpg"
      },
      {
        "artist": "Knowledge",
        "imageURL": "knx.jpg"
      },
      {
        "artist": "Knowledge",
        "imageURL": "knx.jpg"
      },
      {
        "artist": "Knowledge",
        "imageURL": "knx.jpg"
      },
      {
        "artist": "Knowledge",
        "imageURL": "knx.jpg"
      },
      {
        "artist": "Knowledge",
        "imageURL": "knx.jpg"
      },
      {
        "artist": "Knowledge",
        "imageURL": "knx.jpg"
      },
      {
        "artist": "Knowledge",
        "imageURL": "knx.jpg"
      },
    ]
    return(
      auth.isLoggedIn ?
      <section>
        <span className="aside_section_title">Subscriptions</span>
        <div className="lib_collection_container">
          {
            Subscriptions.map( item => {
              return <MediumUserListItem {...item}/>
            })
          }
        </div>
      </section> : <UnauthorizedAside/>
    )
  }