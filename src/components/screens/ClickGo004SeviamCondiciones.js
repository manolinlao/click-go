import React, { useLayoutEffect, useRef, useState } from 'react';
import { typesHeader } from '../../types/types';
import { ButtonScroll } from '../ui/ButtonScroll';
import { Header } from '../ui/Header';
import { mockCondicionesSeviam } from '../../mock/mockTexts';
import { ButtonSelector } from '../ui/ButtonSelector';
import { useNavigate } from 'react-router';

export const ClickGo004SeviamCondiciones = () => {

  const textRef = useRef();
  const navigate = useNavigate();

  let actualPosition = 0;  
  const containerHeight = 350;
  const [controlPosition,setControlPosition] = useState(0);

  const objHeader = {
    showExit: true,
    showHome: true,
    showBack: true,
    backNavigation: 'ofrecerSeviam',
    navObj: {
      show: true,
      title: 'Click & Go',
      steps: [
        {text:'Configurar',mode:typesHeader.NAV_STEP_GREY},
        {text:'',mode:typesHeader.NAV_STEP_ACTIVE},
        {text:'Confirmar',mode:typesHeader.NAV_STEP_GREY},        
      ],
    }
  }

  const objScreen = {
    jliTitle: 'Información Pre-contractual. Información Normalizada Europea',
    jliAceptar: 'Aceptar y continuar',
    textoInfo: mockCondicionesSeviam,
  }


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

  const handleNext = () =>{
    navigate('/ofrecerSeviam');
  }


  useLayoutEffect(()=>{
    textRef.current.innerHTML=objScreen.textoInfo;   
    setControlPosition(textRef.current.clientHeight-containerHeight);
  },[objScreen.textoInfo]);

  return (
    <div className='screen-container'>
      <Header objHeader={ objHeader }/>  
      <div className='screen-title'>
        { objScreen.jliTitle }
      </div>
      <div className='screen-textScrolled-main'>
        <div className='screen-textScrolled-container'>
          <div ref={ textRef } className='screen-textScrolled-item'>          
            { objScreen.textoInfo }          
          </div>
        </div>
        <div className='screen-textScrolled-buttons'>
          <ButtonScroll type="up" actionClick={ handleUp }/>
          <br/><br/><br/><br/><br/><br/><br/><br/> 
          <ButtonScroll type="down" actionClick={ handleDown }/>
        </div>        
      </div>
      <div style={{marginTop:'20px',textAlign:'center'}}>
       <ButtonSelector text={ objScreen.jliAceptar } actionClick={ handleNext } icon='check' enabled={ true }/>
      </div>
    </div>
  )
}
