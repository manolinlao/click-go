import React from 'react'
import '../../styles/buttons.css';

export const ButtonNav = ( {text, icon, actionClick, enabled} ) => {

  let strButton = text;
  let iconClass = '';
  let buttonClass ='button-nav';

  if(icon==='next'){
    strButton = strButton + " ";
    iconClass = 'far fa-arrow-alt-circle-right';
  }

  if(icon==='back'){
    strButton = strButton + " ";
    iconClass = 'far fa-arrow-alt-circle-left';
  }

  if(enabled===false){
      buttonClass = 'button-nav-disabled'
  }

  const clickado = ()=>{
    if(enabled===false){
    //  actionClick();
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
        <i className={ iconClass }></i>
        <div>
          { strButton }
        </div>        
      </button>  
    </div>
  )
}
