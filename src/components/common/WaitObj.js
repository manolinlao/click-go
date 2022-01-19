import React from 'react';
import '../../styles/waitObj.css';


export const WaitObj = () => {
  return (
    <div className='wait-container'>
      <div className='wait-box'>
        <div className='wait-header' >
          <i className="far fa-clock fa-spin"></i>
        </div>
        <div className='wait-body'>
          Espera, por favor.
          <br/>
          La operación se está procesando
        </div>      
      </div>
    </div>
  )
}
