import React from 'react';
import '../../styles/buttons.css';

export const ButtonScroll = ( { type, actionClick } ) => {

  let icon = 'fas fa-arrow-circle-up';
  if(type==='down'){
    icon = 'fas fa-arrow-circle-down';
  }
  return (
    <div>
      <button className="button-scroll" onClick={actionClick}><i className={icon}></i></button>
    </div>
  )
}
