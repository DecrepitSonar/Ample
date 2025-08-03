import React, { SyntheticEvent, useEffect, useState } from "react";

export default function PurchaseModal(props){

  const modalClosedStyle = {
    display: 'none', 
  }

  return(
    <div className="ModalContainer" style={props.purchaseModalOpen ? {} :  modalClosedStyle}>
        <form action=""></form>
    </div>
  )
}