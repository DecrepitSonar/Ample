import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AudioListItem from "../../../../Components/AudioListItem";
import { AudioListItemPropType } from "../../../../utils/ObjectTypes";
import { getUserPayments, setPaymentSettings } from "../../../../utils/settingsSlice";
import { RootState, useAppDispatch } from "../../../../utils/store";

export default function PaymentSettings(){

    const history = useSelector( (state: RootState) => state.audioPlayer.audioHistory)
    const payments = useSelector( (state: RootState) => state.settings.paymentSettings)
  
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
              <h1>Balance</h1>
              <div className='settings_content_item_container' >
                <div className='settings_content_item'>
                  <h1>{payments.credit}</h1>
                  <span>
                    Credits
                  </span>
                </div>
              </div>
            </section>
            
            <section>
              <h1>History</h1>
              <div className='wallet_settings_content_item_container'>
                <table className='wallet_settings_purchase_history'>
                    <tr>
                      <th>Item</th>
                      <th>Type</th>
                      <th>Duration</th>
                      <th>Amount</th>
                    </tr>
                    
                  <tbody>
                    {
                      history.map( (item: AudioListItemPropType)  => {
                        
                        return <tr>
                      <td> <AudioListItem {...item} /></td>
                      <td> Track</td>
                      <td> 0</td>
                      <td>-1k</td>
                    </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            </section>
            </>
        }
        
      </div>
    )
  }