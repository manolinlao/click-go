import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { typesHeader } from '../../types/types'
import { WaitObj } from '../common/WaitObj';
import { Header } from '../ui/Header';
import { mockCalculSimulSI } from '../../mock/mockCalculSimulSI';
import { clickgoDataSetDatosAdmisionActivo, clickgoDataSetDatosAdmisionActivoSelected } from '../../actions/clickgoDataActions';
import { ButtonSelector } from '../ui/ButtonSelector';
import { QuotesTable } from '../ui/QuotesTable';

export const ClickGo002Quote = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();  
  //const clickgoData = useSelector(state=>state.clickgoData);  
  const [loading,setLoading] = useState(true);
  
  const [datosTable,setDatosTable] = useState();

  const [indexSelected,setIndexSelected] = useState(-1);
  const [goNextEnabled,setGoNextEnabled] = useState(false);


  const objHeader = {
    showExit: true,
    showHome: true,
    showBack: true,
    backNavigation: 'intro',
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
    jliTitle: 'Selecciona la cuota mensual según el importe y el plazo que deseas solicitar',
    jliMeses: 'Meses',
    jliCambiarImporte: 'Cambiar importe',
    jliCambiarPlazo: 'Cambiar plazo',
    jliContinuar: 'Continuar',
    jliEuroMes: '€/mes',
  }

  const goChangePlz = () =>{
    navigate('/changePlz');
  }

  const goChangeImp = () =>{
    navigate('/changeImp');
  }

  const goNext = () =>{
    dispatch( clickgoDataSetDatosAdmisionActivoSelected(indexSelected) );
    navigate('/accounts');
  }

  const selected = (value) =>{
    console.log("ClickGlo002Quote::selected::"+value);
    setIndexSelected(value);
    setGoNextEnabled(true);
  }

  const getData = useCallback( async()=>{
    console.log("getData");
    const url = 'https://www.breakingbadapi.com/api/quotes/1';
    const resp = await(fetch( url ));
    const respJSON = await resp.json();    
    const [data]= respJSON;
    console.log(data);
    //aquí tenemos una respuesta, le pongo un timeout para que se vea la página de carga

    let datosRespuestaMockeada = mockCalculSimulSI;

    setTimeout(()=>{
      dispatch( clickgoDataSetDatosAdmisionActivo(datosRespuestaMockeada));          
      console.log(datosRespuestaMockeada)
      setDatosTable(datosRespuestaMockeada);   
      setLoading(false);
    },2000);
    
  },[dispatch,setDatosTable]);

  useEffect(()=>{    
    getData();        
  },[getData]);


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
  
        <div>
          <QuotesTable datos={datosTable.listaSimulacion} functionSelected={selected}/>
        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
          <div style={{marginRight:'20px'}}>
            <ButtonSelector text={ objScreen.jliCambiarPlazo } actionClick={ goChangePlz } />           
          </div>
          <div style={{marginLeft:'20px'}}>
            <ButtonSelector text={ objScreen.jliCambiarImporte } actionClick={ goChangeImp } /> 
          </div>       
        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
          <ButtonSelector text={ objScreen.jliContinuar } actionClick={ goNext } icon='next' enabled={ goNextEnabled }/> 
        </div>
  
      </div>
    )
  }

  
}
