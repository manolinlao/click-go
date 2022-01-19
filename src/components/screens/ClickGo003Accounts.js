import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clickgoDataSetCuentaAbono } from '../../actions/clickgoDataActions';
import { mockAccounts } from '../../mock/mockAccounts';
import { typesHeader } from '../../types/types';
import { WaitObj } from '../common/WaitObj';
import { ButtonNav } from '../ui/ButtonNav';
import { Header } from '../ui/Header';
import { SelectAccount } from '../ui/SelectAccount';

export const ClickGo003Accounts = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const maxAccountsPerPag = 4;
  const [ loading, setLoading ] = useState(true);
  const [ accounts, setAccounts ] = useState([]);
  const [ pagActual, setPagActual ] = useState(0);
  const [ enableBack, setEnableBack ] = useState(false);
  const [ enableNext, setEnableNext ] = useState(false);
  const [ maxPags, setMaxPags ] = useState(0);
  

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
    jliTitle: 'Indica la cuenta en la que quieres que se te abone el préstamo', 
    jliNumAccount: 'Número de cuenta',
    jliSelect: 'Seleccionar',
    jliOther: 'Otras cuentas',
  }

  const goNextAccounts = () =>{
    setPagActual(pagActual+1);
  }

  const goBackAccounts = () =>{
    setPagActual(pagActual-1);
  }

  const accountSelected = (strAccount) =>{
    dispatch( clickgoDataSetCuentaAbono(strAccount) );
    navigate('/ofrecerSeviam');
  }

  const getData = useCallback( async()=>{
    console.log("getData");
    const url = 'https://www.breakingbadapi.com/api/quotes/1';
    const resp = await(fetch( url ));
    const respJSON = await resp.json();    
    const [data]= respJSON;
    console.log(data);
    //aquí tenemos una respuesta, le pongo un timeout para que se vea la página de carga

    setAccounts(mockAccounts.accounts);
    let resto = mockAccounts.accounts.length%maxAccountsPerPag;
    let cociente = Math.floor(mockAccounts.accounts.length/maxAccountsPerPag);

   
    if(resto===0){      
      setMaxPags(cociente);
    }else{
      setMaxPags(cociente+1);
    }
    
    setTimeout(()=>{                   
      setLoading(false);
    },1000);
    
  },[]);

  useEffect(()=>{    
    getData();        
  },[getData]);

  useEffect(()=>{    
    if(!loading){
      console.log("maxPags=" + maxPags);
      setEnableBack(false);
      if(maxPags>1){
        setEnableNext(true);
      }
    }
  },[loading,maxPags]);

  useEffect(()=>{
    if(!loading){
      if(pagActual>0){
        setEnableBack(true);
      }else{
        setEnableBack(false);
      }
      if(pagActual===(maxPags-1)){
        setEnableNext(false);
      }else{
        setEnableNext(true);
      }
    }
    
  },[pagActual,maxPags,loading]);

  

  if(loading){    
    return(
      <div>
        <WaitObj/>
      </div>
    )
  }else{  
    return (
      <div className='screen-container'>
        <Header objHeader={ objHeader }/>  
        <div className='screen-title'>
          { objScreen.jliTitle }
        </div>
        <div style={{marginTop:'20px'}}>             
          <SelectAccount account={accounts[(pagActual*4)]} actionClick={ accountSelected }/>          
        </div>
        <div style={{marginTop:'20px'}}>             
          <SelectAccount account={accounts[(pagActual*4)+1]} actionClick={ accountSelected }/>          
        </div>
        <div style={{marginTop:'20px'}}>             
          <SelectAccount account={accounts[(pagActual*4)+2]} actionClick={ accountSelected }/>          
        </div>
        <div style={{marginTop:'20px'}}>             
          <SelectAccount account={accounts[(pagActual*4)+3]} actionClick={ accountSelected }/>          
        </div>
        <div style={{margin:'auto',marginTop:'20px',display:'flex'}}>
          <div style={{marginRight:'20px'}}>
            <ButtonNav text={ objScreen.jliOther } actionClick={ goBackAccounts } icon='back' enabled={enableBack}/>
          </div>
          <div style={{marginLeft:'20px'}}>
            <ButtonNav text={ objScreen.jliOther } actionClick={ goNextAccounts } icon='next' enabled={enableNext}/>
          </div>          
        </div>
        
      </div>
    )
  }
}
