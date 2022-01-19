import React from 'react';
import '../../styles/account.css';

export const SelectAccount = ( {account, actionClick} ) => {

  const objTextos = {
    jliNumAccount: 'Número de cuenta',
  }

  const clickado = ()=>{
    actionClick(account);
  }

  if(!account){
    return(
      <div></div>
    )
  }
  return (     
     <div className='account-container'>
       <div className='account-item' onClick={ clickado }>
         <div className='account-item-title'>
          {objTextos.jliNumAccount}
         </div>
         <div className='account-item-account'>
           {account}
         </div>
       </div>
     </div>   
  )
}
