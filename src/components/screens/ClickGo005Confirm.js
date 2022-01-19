import React, { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ButtonScroll } from '../ui/ButtonScroll';
import { ButtonSelector } from '../ui/ButtonSelector';
import { typesHeader } from '../../types/types';
import { Header } from '../ui/Header';
import { showMessage } from '../../actions/messageActions';
import '../../styles/confirm.css';


export const ClickGo005Confirm = () => {

  const refConfirmDiv = useRef();
  const refContentDiv = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let contentConfirm = '';

  let actualPosition = 0;  
  const containerHeight = 350;
  const [controlPosition,setControlPosition] = useState(0);

  const {cuentaAbono, seviam} = useSelector(state=>state.clickgoData);
  const {contratar:contratarSeviam} = seviam;

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
        {text:'',mode:typesHeader.NAV_STEP_GREY},
        {text:'Confirmar',mode:typesHeader.NAV_STEP_ACTIVE},        
      ],
    }
  }

  const objScreen = {
    jliTitle: 'Comprueba los datos y pulsa Continuar',
    jliContinuar: 'Continuar',
    jliImprimir: 'Imprimir',
  }

  const handleUp = () =>{          
    if((actualPosition*-1)>controlPosition){
      return;
    }
    actualPosition = actualPosition-20;    
    refConfirmDiv.current.style.top = actualPosition + 'px';        
  }

  const handleDown = () =>{
    if(actualPosition===0) return;
    actualPosition = actualPosition+20;
    refConfirmDiv.current.style.top = actualPosition + 'px';  
  }

  const handlePrint = () =>{
    dispatch( showMessage('Imprimiendo','print','3000',false,'Cerrar','back') );
    navigate('/message');
  }

  const handleNext = ()=>{
    dispatch( showMessage('Finalización','info','3000',false,'Cerrar','exit') );
    navigate('/message');
  }

  useLayoutEffect(()=>{
    refContentDiv.current.innerHTML = contentConfirm;    
    setControlPosition(refConfirmDiv.current.clientHeight-containerHeight);
  },[contentConfirm]);





  const createConfirmContent = () =>{    
    
    contentConfirm = `
      <div style='width:550px'>
        <strong>DATOS DEL PRÉSTAMO</strong>
        <hr/>
      </div>
      
      <div><span class='conf-data'>Importe solicitado:</span><span class='conf-value'> 2.000,00 €</span></div>
      <div><span class='conf-data'>Cuota mensual:</span><span class='conf-value'> 125,52 €</span></div>
      <div><span class='conf-data'>Plazo:</span><span class='conf-value'> 18 meses</span></div>
      <div><span class='conf-data'>Tipo de interés nominal:</span><span class='conf-value'> 15,80%</span></div>
      <div><span class='conf-data'>T.A.E. (Tasa Anual Equivalente):</span><span class='conf-value'> 97,45%</span></div>
      <div><span class='conf-data'>Comisiones:</span></div>
      <div>
        <ul>
          <li><span class='conf-data'>Apertura:</span><span class='conf-value'> 0,00 €</span></li>
          <li><span class='conf-data'>Estudio:</span><span class='conf-value'> 0,00 €</span></li>
          <li><span class='conf-data'>Amortización:</span><span class='conf-value'> 1,00 €</span></li>
          <li><span class='conf-data'>Reclamación de impagados:</span><span class='conf-value'> 3,50 €</span></li>
        </ul>
      </div>
      <div><span class='conf-data'>Importe a abonar en cuenta:</span><span class='conf-value'> 2.0000,00 €</span></div>
      <div><span class='conf-data'>Cuenta de abono del préstamo:</span><span class='conf-value'> ${cuentaAbono} </span></div>
      <div><span class='conf-data'>Vencimiento final:</span><span class='conf-value'> 01/11/2022</span></div>
      <div><span class='conf-data'>Fecha fracción:</span><span class='conf-value'> 01/05/2021</span></div>
      <div><span class='conf-data'>Importe fracción:</span><span class='conf-value'> 13,85 €</span></div>
      <div><span class='conf-data'>Fecha de la primera cuota:</span><span class='conf-value'> 01/06/2022</span></div>
      <div><span class='conf-data'>Fecha pagos sucesivos:</span><span class='conf-value'> El día 01 de cada mes</span></div>
      <div><span class='conf-data'>Amortización:</span><span class='conf-value'> 18 pagos de 125,52 €</span></div>
      <div><span class='conf-data'>Importe total de pagos:</span><span class='conf-value'> 2.273,26 €</span></div>
      <div><span class='conf-data'>Intereses de demora:</span><span class='conf-value'> 17,80%</span></div>
      
    `;

    if(contratarSeviam){
      contentConfirm = contentConfirm + `
      <div style='width:550px;margin-top:20px'>
        <strong>DATOS DEL SEGURO DE VIDA</strong>
        <hr/>
      </div>
      <div><span class='conf-data'>Capital asegurado:</span><span class='conf-value'> 2.000,00 €</span></div>
      <div><span class='conf-data'>Beneficiarios en caso de siniestro:</span><span class='conf-value'> La entidad financiera por la deuda pendiente y los herederos del titular por el exceso. En caso de invalidez absoluta y permanente, el propio asegurado.</span></div>
      <div><span class='conf-data'>Prima única del seguro:</span><span class='conf-value'> 37,15 €</span></div>
      <div><span class='conf-data'>Cuenta de cargo:</span><span class='conf-value'> ${cuentaAbono}</span></div>
      `;
    }

  }

  createConfirmContent();

  return (
    <div className='screen-container'>
      <Header objHeader={ objHeader }/>  
      <div className='screen-title'>
        { objScreen.jliTitle }
      </div>
      <div className='screen-textScrolled-main'>
        <div className='screen-textScrolled-container'>
          <div ref={ refConfirmDiv } className='screen-textScrolled-item'>          
            <div ref={ refContentDiv }></div>
          </div>
        </div>
        <div className='screen-textScrolled-buttons'>
          <ButtonScroll type="up" actionClick={ handleUp }/>
          <br/><br/><br/><br/><br/><br/><br/><br/> 
          <ButtonScroll type="down" actionClick={ handleDown }/>
        </div>        
      </div>
      <div style={{display:'flex',marginTop:'20px',justifyContent:'center',marginRight:'80px'}}>
        <div style={{marginRight:'20px'}}>
          <ButtonSelector text={ objScreen.jliImprimir } actionClick={ handlePrint } icon='print' enabled={ true }/>
        </div>
        <div style={{marginLeft:'20px'}}>
          <ButtonSelector text={ objScreen.jliContinuar } actionClick={ handleNext } icon='next' enabled={ true }/>  
        </div>       
      </div>
    </div>
  )
}
