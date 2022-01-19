import React from 'react'
import { typesButton } from '../../types/types';
import '../../styles/buttons.css';

export const ButtonHeader = ( {text, type, actionClick} ) => {

  let txtClassButton = "";
  switch(type){
    case typesButton.HOME:
      txtClassButton = 'fa fa-home';
      break;
    case typesButton.EXIT:
      txtClassButton = 'fa fa-door-open';
      break;
    case typesButton.BACK:
      txtClassButton = 'fa fa-arrow-circle-left';
      break;
    default:
      txtClassButton = '';
      break;
  }

  return (
    <div>
      <button
        className="button-header"
        onClick = { actionClick }
      >
        <i className={ txtClassButton }></i>
        &nbsp;&nbsp;{ text }
      </button>  
    </div>
  )
}
