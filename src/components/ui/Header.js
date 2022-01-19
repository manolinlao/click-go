import React from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';

import { sessionFinalize } from '../../actions/sessionActions';
import { typesButton, typesResult } from '../../types/types';
import { ButtonHeader } from '../ui/ButtonHeader';

import '../../styles/header.css';
import { NavHeader } from './NavHeader';

export const Header = ({objHeader}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actionHeaderHome = () =>{
    dispatch( sessionFinalize( typesResult.EXIT_HOME ) );
    navigate('/exit');
  }

  const actionHeaderExit = () => {
    dispatch( sessionFinalize( typesResult.EXIT_END ) );
    navigate('/exit');
  }

  const actionHeaderBack = () => {    
    navigate( `/${ objHeader.backNavigation }` );
  }

  return (
    <div className="header-main">       

      {
        (objHeader.showBack)
        &&
        <div style={{marginRight:'10px'}}>
          <ButtonHeader text="Atrás" type={ typesButton.BACK } actionClick={ actionHeaderBack } />
        </div>        
      }  

      {        
        (objHeader.navObj.show)
        &&       
        <div className='header-item'>
          <NavHeader data={ objHeader.navObj } />
        </div>
      }
     
      {        
        (objHeader.showHome)
        &&       
        <div style={{marginLeft:'10px'}}>
          <ButtonHeader text="Inicio" type={ typesButton.HOME } actionClick={ actionHeaderHome } />
        </div>
      }

      {
        
        (objHeader.showExit)
        &&
        <div style={{marginLeft:'10px'}}>
          <ButtonHeader text="Salir" type={ typesButton.EXIT } actionClick={ actionHeaderExit } />
        </div>
      }      
     
    </div>
  )
}
