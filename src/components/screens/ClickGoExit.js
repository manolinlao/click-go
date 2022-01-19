import React from 'react';
import { useSelector } from 'react-redux';
import { typesResult } from '../../types/types';
import { MessageObj } from '../ui/MessageObj';

export const ClickGoExit = () => {

  const { transactionResult } = useSelector(state=>state.session);
  let message = '';
  if(transactionResult===typesResult.EXIT_END){
    message = 'Retire el activador';
  }else if(transactionResult===typesResult.EXIT_HOME){
    message = 'Going Home';
  }else{
    message = `Out of operative. Result = ${transactionResult}`;
  }


  return (
   <div>
    <MessageObj text={message} type='info'  />
   </div>
    
  )
}
