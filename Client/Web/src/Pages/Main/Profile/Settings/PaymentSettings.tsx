import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AudioListItem from "../../../../Components/AudioListItem";
import { AudioListItemPropType } from "../../../../utils/ObjectTypes";
import { getUserPayments, setPaymentSettings } from "../../../../utils/settingsSlice";
import { RootState, useAppDispatch } from "../../../../utils/store";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function PaymentSettings(){

    const history = useSelector( (state: RootState) => state.audioPlayer.audioHistory)
    const payments = useSelector( (state: RootState) => state.settings.paymentSettings)
    const [ tableSection, setTableSection ] = useState('')

    const dispatch = useAppDispatch()
  
    useEffect( () => {
      
      ( async () => {
        console.log('useEffect')
        console.log( payments)
        if( Object.keys(payments).length > 0){
          console.log( payments )
          return 
        }
  
        try{
          
          const response = await dispatch(getUserPayments())
          
          if( response.payload != undefined ){
            const data =  response.payload.data
            console.log( data )
            dispatch( setPaymentSettings(data) )
          }
  
        }
        catch( error){
          console.log( error )
        }
      })()
    },[])
  
    return(
      <div className='settings_content_section'>
        {
          Object.keys(payments).length > 0 &&
          <>
            <section>
              <div className='settings_content_item_container' >
                <div className='settings_content_item'>
                  <span>
                    My Balance
                  </span>
                  <h1>${payments.credit}</h1>
                </div>
                
              </div>
              <button className="section_button"> <i><PlusIcon/></i>Add Funds</button>
            </section>
            
            <h1>Payment</h1>
            <section>
              <div className='settings_content_item_container card_collection' >
                <div className='settings_content_item'>
                  <span>
                    My cards
                  </span>
                </div>
                  <span>You have no cards </span>
              </div>
              <button className="section_button"> <i><PlusIcon/></i>Add Payment Method</button>
            </section>
            
            <h1>Payments</h1>
            
            <ul className="table_header_nav">
              <li style={ tableSection == '' ? {'color': 'rgb(198, 161, 104)'} : {}}
              onClick={() =>setTableSection('')} >Purchases</li>
              <li style={ tableSection == 'Streams' ? {'color': 'rgb(198, 161, 104)'} : {}}
              onClick={() =>setTableSection('Streams')}>Streams</li>
              <li style={ tableSection == 'Subscriptions' ? {'color': 'rgb(198, 161, 104)'} : {}}
              onClick={() =>setTableSection('Subscriptions')}>Subscriptions</li>
            </ul>

          {
            {
              '': <section>
                <div className='wallet_settings_content_item_container'>
                  <table className='wallet_settings_purchase_history'>
                      <tr>
                        <th>Item</th>
                        <th>Amount</th>
                      </tr>
                    <tbody></tbody>
                  </table>
                </div>
              </section>,
              'Streams': <section>
                <div className='wallet_settings_content_item_container'>
                  <table className='wallet_settings_purchase_history'>
                      <tr>
                        <th>Item</th>
                        <th>Amount</th>
                      </tr>
                    <tbody></tbody>
                  </table>
                </div>
              </section>,
              'Subscriptions': <section>
                <div className='wallet_settings_content_item_container'>
                  <table className='wallet_settings_purchase_history'>
                      <tr>
                        <th>Item</th>
                        <th>Amount</th>
                      </tr>
                    <tbody></tbody>
                  </table>
                </div>
              </section>

            }[ tableSection]
          }
            </>
        }
        
      </div>
    )
  }