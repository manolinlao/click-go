import React, { useLayoutEffect, useRef, useState } from 'react';
import { Header } from '../ui/Header';
import { typesHeader } from '../../types/types';
import '../../styles/screen.css';
import { mockExplicacionesGlickGo } from '../../mock/mockTexts';
import { ButtonScroll } from '../ui/ButtonScroll';



export const ClickGo001Info = () => {
  
  const textRef = useRef();

  let actualPosition = 0;  
  const containerHeight = 350;
  const [controlPosition,setControlPosition] = useState(0);

  const objHeader = {
    showExit: true,
    showHome: true,
    showBack: true,
    backNavigation: 'intro',
    navObj: {
      show: true,
      title: 'Click & Go',
      steps: [
        {text:'Configurar',mode:typesHeader.NAV_STEP_ACTIVE},
        {text:'Identificación',mode:typesHeader.NAV_STEP_GREY},
        {text:'Confirmar',mode:typesHeader.NAV_STEP_GREY},        
      ],
    }
  }

  const objScreen = {
    jliTitle: 'Explicaciones adecuadas Click&Go',
    textoInfo: mockExplicacionesGlickGo,
  }

  useLayoutEffect(()=>{
    textRef.current.innerHTML=objScreen.textoInfo;   
    setControlPosition(textRef.current.clientHeight-containerHeight);
  },[objScreen.textoInfo]);

  const handleUp = () =>{    
    if((actualPosition*-1)>controlPosition){
      return;
    }
    actualPosition = actualPosition-20;    
    textRef.current.style.top = actualPosition + 'px';        
  }

  const handleDown = () =>{
    if(actualPosition===0) return;
    actualPosition = actualPosition+20;
    textRef.current.style.top = actualPosition + 'px';  
  }

  return (
    <div className='screen-container'>
      <Header objHeader={ objHeader }/>  
      <div className='screen-title'>
        { objScreen.jliTitle }
      </div>
      <div className='screen-textScrolled-main'>
        <div className='screen-textScrolled-container'>
          <div ref={ textRef } className='screen-textScrolled-item'>          
            { objScreen.textoInfo}          
          </div>
        </div>
        <div className='screen-textScrolled-buttons'>
          <ButtonScroll type="up" actionClick={ handleUp }/>
          <br/><br/><br/><br/><br/><br/><br/><br/> 
          <ButtonScroll type="down" actionClick={ handleDown }/>
        </div>  
      
      </div>
    </div>
  )
}
