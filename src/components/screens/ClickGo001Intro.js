import React, { useCallback, useEffect, useState } from 'react';
import { Header } from '../ui/Header';
import { typesHeader, typesAfterMessage, typesMessage } from '../../types/types';
import { constants } from '../../helpers/constants'
import '../../styles/screen.css';
import { getFilledString, formatImport, formatImportNotZero } from '../../helpers/utils';
import { ButtonSelector } from '../ui/ButtonSelector';
import { useNavigate } from 'react-router';
import { FormImport } from '../ui/FormImport';
import { useDispatch, useSelector } from 'react-redux';
import { clickgoDataResetDatosAdmisionActivo, clickgoDataSetImport, clickgoDataSetInitialData } from '../../actions/clickgoDataActions';
import { showMessage } from '../../actions/messageActions';
import { WaitObj } from '../common/WaitObj';






export const ClickGo001Intro = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickgoData = useSelector(state=>state.clickgoData);  
  const [formInputValue,setFormInputValue] = useState(clickgoData.clickgoImport + '€');
  const objData = clickgoData.initialData;

  const [loadedInitialData,setLoadedInitialData] = useState(objData.loaded);
 

  const objHeader = {
    showExit: true,
    showHome: true,
    showBack: true,
    backNavigation: 'exit',
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
    jliTitle: 'Disponga del dinero que necesita al instante y en su cuenta',
    jliQuestion: '¿Cuánto dinero necesitas?',
    jliMinMaxTxt: 'Mínimo ~ € - Máximo ~ €',
    jliInfo1: 'Dinero en su cuenta al momento',
    jliInfo1_2: 'Para un viaje, un máster, un móvil nuevo...',
    jliInfo2: 'Sin papeleos ni explicaciones',
    jliInfo2_2: 'El préstamo se formaliza electrónicamente para su comodidad',
    jliInfo3: 'Cuotas y plazos a medida',
    jliInfo3_2: 'Devolución entre 6 y 48 meses',
    jliDoubt: '¿Tienes alguna duda?',
    jliQuote: 'Calcular cuota',
  }

 
  
  const goCalculQuote = () => {
    
    let tmpValue = formInputValue.replace('€','') -0;
    
    dispatch( clickgoDataSetImport(formInputValue.replace('€','')) );   

    if(tmpValue<objData.min || tmpValue>objData.max){  
      let msgNok = `El importe de ${tmpValue}€ supera el máximo permitido`;
      if(tmpValue<objData.min){
        msgNok = `El importe de ${tmpValue}€ es inferior al mínimo permitido`;
      }
      dispatch( showMessage(msgNok,typesMessage.ALERT,constants.NOK_TIMEOUT,true,'Cerrar',typesAfterMessage.BACK) );
      navigate('/message');
    }
    else{         
      navigate('/quote');
    }
  }

  const goInfo = () => {
    dispatch( clickgoDataSetImport(formInputValue.replace('€','')) );
    navigate('/info');
  }


  const handleKeyDown = useCallback((event) => {
    if(!objData.loaded){
      return;
    }
    if(!isNaN(event.key)){      
      setFormInputValue(previousValue => {
        let tmp = previousValue.replace('€','');
        tmp = tmp + event.key + '€';
        return tmp;
      });      
    }else{
      if(event.code.toLowerCase()==='backspace'){
        setFormInputValue(previousValue => {
          let tmp = previousValue.replace('€','');
          tmp = tmp.substr(0,tmp.length-1) + '€';
          return tmp;
        });  
      }
      if(event.code.toLowerCase()==='delete'){
        setFormInputValue('€');
      }
    }  
  }, [objData.loaded]);


  const getInitialData = useCallback( async()=>{
    console.log("getInitialData");
    const url = 'https://www.breakingbadapi.com/api/quotes/1';
    const resp = await(fetch( url ));
    const respJSON = await resp.json();    
    const [data]= respJSON;
    console.log(data);
    //aquí tenemos una respuesta, le pongo un timeout para que se vea la página de carga
    setTimeout(()=>{
      dispatch(clickgoDataSetInitialData({loaded:true,min:2000,max:45000}));    
      setLoadedInitialData(true);
    },3000);
    
  },[dispatch]);

  useEffect(()=>{
    document.addEventListener("keydown", handleKeyDown, false);
    return() => {
      document.removeEventListener("keydown",handleKeyDown, false);
    };
  },[handleKeyDown]);

  useEffect(()=>{    

    dispatch(clickgoDataResetDatosAdmisionActivo());

    if(!objData.loaded){
      getInitialData();
    }    
  },[getInitialData,objData.loaded,dispatch]);


  let txtSubForm = '';

  if(!loadedInitialData){    
    return(
      <div>
        <WaitObj/>
      </div>
    )
  }else{
    txtSubForm = getFilledString(objScreen.jliMinMaxTxt,formatImport(objData.min),formatImport(objData.max));
  }

  return (
    <div className='screen-container'>
      <Header objHeader={ objHeader }/>  
      <div className='screen-title'>
        { objScreen.jliTitle }
      </div>

      <div style={{marginTop:'25px',textAlign:'center',fontWeight:'bold'}}>
        { objScreen.jliQuestion }
      </div>
     
      <div style={{marginTop:'20px',textAlign:'center'}}>
        <FormImport value={ formatImportNotZero(formInputValue.replace('€',''))+ '€' }/>       
        <div className='screen-text-subForm' style={{marginTop:'5px'}}>
          { txtSubForm }
        </div>        
      </div>

      <div style={{display:'flex',justifyContent:'center',textAlign:'center',marginTop:'20px',fontSize:'smaller'}}>
        <div className="card-group" style={{width:'80%'}}>
          <div className="card border-info text-dark bg-light mb-3" >
            <div className="card-body">
              <h5 className="card-title"><i className='far fa-clock'></i></h5>
              <h6 className="card-subtitle mb-2 text-muted">{ objScreen.jliInfo1 }</h6>
              <p className="card-text" style={{fontSize:'small'}}>{ objScreen.jliInfo1_2 }</p>    
            </div>
          </div>

          <div className="card border-info  bg-light mb-3" >
            <div className="card-body">
              <h5 className="card-title"><i className='far fa-hand-point-up'></i></h5>
              <h6 className="card-subtitle mb-2 text-muted">{ objScreen.jliInfo2 }</h6>
              <p className="card-text" style={{fontSize:'small'}}>{ objScreen.jliInfo2_2 }</p>    
            </div>
          </div>

          <div className="card border-info  bg-light mb-3" >
            <div className="card-body">
              <h5 className="card-title"><i className='fas fa-calculator'></i></h5>
              <h6 className="card-subtitle mb-2 text-muted">{ objScreen.jliInfo3 }</h6>
              <p className="card-text" style={{fontSize:'small'}}>{ objScreen.jliInfo3_2 }</p>    
            </div>
          </div>
        </div>
      </div>

      <div style={{marginTop:'20px',display:'flex',justifyContent:'center'}}>
        <div style={{marginRight:"20px"}}>
          <ButtonSelector text={ objScreen.jliDoubt } actionClick={ goInfo }/>
        </div>
        <div style={{marginLeft:"20px"}}>
          <ButtonSelector text={ objScreen.jliQuote } actionClick={ goCalculQuote } />  
        </div>        
      </div>
     
    </div>    
  )
}
