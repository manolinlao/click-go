import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { MessageObj } from '../ui/MessageObj';


export const ClickGoMessage = () => {

  const message = useSelector(state=>state.message);
  const navigate = useNavigate();


  const myTimeout = setTimeout(()=>{
    if(message.after==="back"){
      navigate(-1);
    }else{
     navigate('/exit');
    }
  },message.timeToShow)

  const handleCloseButton = () =>{
    clearTimeout(myTimeout);
    if(message.after==="back"){
      navigate(-1);
    }else{
     navigate('/exit');
    }
  }

  return (
    <div>
      <MessageObj text={message.txt} type={message.type} close={message.closeButton} closeTxt={message.txtButton} functionClose={ handleCloseButton }/>
    </div>
  )
}
