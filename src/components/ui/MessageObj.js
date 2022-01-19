import React from 'react'
import '../../styles/message.css';
import { typesMessage } from '../../types/types';
import { ButtonSelector } from './ButtonSelector';

export const MessageObj = ({text,type,close,closeTxt,functionClose}) => {

  let strIcon = 'fas fa-info-circle';
  let colorIcon = '#4a90e2';
 
  if(type===typesMessage.ALERT){
    strIcon = 'fas fa-skull-crossbones';
    colorIcon = '#a73b3b';
  }

  if(type===typesMessage.PRINT){
    strIcon = 'fas fa-toilet-paper fa-spin';
    
  }

  return (
    <div className='message-container'>
      <div className='message-box'>
        <div className='message-header' >
          <i className={strIcon} style={{color:colorIcon}}></i>
        </div>
        <div className='message-body'>
          {text}
        </div>
        {
          (close)
          &&
          <div className='message-button'>          
            <ButtonSelector text={ closeTxt } actionClick={ functionClose }/>
          </div>
        }
       
      </div>
    </div>
    
  )
}
