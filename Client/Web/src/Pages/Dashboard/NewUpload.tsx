import React from "react";
import { RiImageCircleFill } from "react-icons/ri";
import { handleSeletedImage } from "../../utils/utilFunctions";


function NewUploads(){
    return(
      <>
        <header> 
          <h1>New Upload</h1>
        </header>
        <form action="">
            <div className="dash_form_section">
                
                <div className="artwork_input"></div>
                <input type="text" />
            </div>
        </form>
      </>
    )
  }

export default NewUploads