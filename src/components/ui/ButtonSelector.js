import React from 'react'
import '../../styles/buttons.css';

export const ButtonSelector = ( {text, icon, actionClick, enabled} ) => {

  let strButton = text;
  let iconClass = '';
  let buttonClass ='button-selector';

  if(icon==='next'){
    strButton = strButton + " ";
    iconClass = 'far fa-arrow-alt-circle-right';
  }

  if(icon==='conditions'){
    strButton = strButton + " ";
    iconClass = 'far fa-comment-dots';
  }

  if(icon==='check'){
    strButton = strButton + " ";
    iconClass = 'fas fa-check';
  }

  if(icon==='ban'){
    strButton = strButton + " ";
    iconClass = 'fas fa-ban';
  }

  if(icon==='print'){
    strButton = strButton + " ";
    iconClass = 'fas fa-toilet-paper';
  }


  if(enabled===false){
      buttonClass = 'button-selector-disabled'
  }

  const clickado = ()=>{
    if(enabled===false){
      //actionClick();
    }else{
      actionClick();
    }
  }

  return (
    <div>
      <button
        className={ buttonClass }
        onClick = { clickado }
      >
        { strButton }
        <i className={ iconClass }></i>
        
      </button>  
    </div>
  )
}
