import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../ui/Header';
import { typesHeader } from '../../types/types';
import { FormImport } from '../ui/FormImport';
import { formatImport, formatImportNotZero, getFilledString } from '../../helpers/utils';
import { ButtonSelector } from '../ui/ButtonSelector';
import { useNavigate } from 'react-router';
import { showMessage } from '../../actions/messageActions';
import { typesMessage, typesAfterMessage} from '../../types/types';
import { constants } from '../../helpers/constants';

export const ClickGo002ChangeImp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickgoData = useSelector(state=>state.clickgoData);
  const objData = clickgoData.initialData;  
  

  const [formInputValue,setFormInputValue] = useState('');

  const objHeader = {
    showExit: true,
    showHome: true,
    showBack: true,
    backNavigation: 'quote',
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
    jliTitle: 'Indica qué importe quieres solicitar',
    jliMinMaxTxt: 'Mínimo ~ € - Máximo ~ €',
    jliContinuar: 'Continuar'
  }


  const handleKeyDown = useCallback((event) => {  
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
  }, []);

  useEffect(()=>{
    document.addEventListener("keydown", handleKeyDown, false);
    return() => {
      document.removeEventListener("keydown",handleKeyDown, false);
    };
  },[handleKeyDown]);

 
  let txtSubForm = '';
  txtSubForm = getFilledString(objScreen.jliMinMaxTxt,formatImport(objData.min),formatImport(objData.max));

  const goNext = ()=>{
    let tmpValue = formInputValue.replace('€','') -0;
    
      

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
  
  return (
    <div className='screen-container'>
      <Header objHeader={ objHeader }/>  
      <div className='screen-title'>
        { objScreen.jliTitle }
      </div>
      <div style={{marginTop:'20px',textAlign:'center'}}>
        <FormImport value={ formatImportNotZero(formInputValue.replace('€',''))+ '€' }/>       
        <div className='screen-text-subForm' style={{marginTop:'5px'}}>
          { txtSubForm }
        </div>        
      </div>
      <div style={{display:'flex',justifyContent:'center',marginTop:'40px'}}>
        <ButtonSelector text={ objScreen.jliContinuar } actionClick={ goNext } icon='next' /> 
      </div>
    </div>
  )
}
