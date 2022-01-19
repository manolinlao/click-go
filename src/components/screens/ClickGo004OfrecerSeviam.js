import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { formatCentieuros, getFilledString } from '../../helpers/utils';
import { typesHeader } from '../../types/types';
import { ButtonSelector } from '../ui/ButtonSelector';
import { Header } from '../ui/Header';
import { clickgoDataSetContratar } from '../../actions/clickgoDataActions';

const mainContainerStyle = {
  backgroundColor:'white',
  border:'1px solid #4a90e2',
  borderRadius:'20px',
  margin:'15px auto',
  padding:'1em',
  width:'600px',
  height:'300px',
  display:'flex',
  flexDirection:'column'
}


export const ClickGo004OfrecerSeviam = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {seviam} = useSelector(state=>state.clickgoData);
  let primaValue = formatCentieuros( seviam.cuota );
   
  const objHeader = {
    showExit: true,
    showHome: true,
    showBack: true,
    backNavigation: 'accounts',
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
    jliTitle: '¿Quieres asegurar tu préstamo y proteger a los tuyos?', 
    jliIncluir: 'Incluir seguro',
    jliNoIncluir: 'No incluir seguro',
    jliCondiciones: 'Ver condiciones',
    jliInfo: 'La contratación del seguro es opcional. Si rechazas la oferta no tendrá impacto en las condiciones del préstamo',
    jliUnicoPago: 'Único pago',
    jliTextoUnicoPago: 'Con un único pago de ~ € puedes asegurar tu préstamo con el Seguro de Vida (SEVIAM) para que los tuyos no hereden la deuda en caso de fallecimiento o tú en caso de invalidez absoluta y permanente.',
  }

  const handleNext = (incluir)=>{
    let seviamObj = seviam;
    seviamObj.contratar = incluir;    
    dispatch( clickgoDataSetContratar(seviamObj) );
    navigate('/confirm');
  }
  const handleCondiciones = ()=>{
    navigate('/seviamCondiciones');
  }

  return (
    <div className='screen-container'>
      <Header objHeader={ objHeader }/>  
      <div className='screen-title'>
        { objScreen.jliTitle }
      </div>
        <div style={mainContainerStyle}>
          <div style={{display:'flex',marginTop:'20px'}}>
            <div>
              <i className='fas fa-umbrella' style={{fontSize:'60pt',color:'#4a90e2'}}></i>
            </div>
            <div>
              <div style={{marginLeft:'20px',fontSize:'smaller',color:'darkslategray'}}>
                { getFilledString(objScreen.jliTextoUnicoPago,primaValue) }
              </div>
              <div style={{marginLeft:'20px',marginTop:'20px',fontWeight:'bold'}}>
                { (objScreen.jliUnicoPago+':') } { primaValue } €
              </div>
            </div>           
          </div>

          <div style={{color:'#4a90e2',margin:'40px',backgroundColor:'white',display:'flex',border:'1px solid #4a90e2',borderRadius:'8px',padding:'10px'}}>
            <div>
              <i className="fas fa-info-circle" style={{fontSize:'20pt'}}></i>
            </div>
            <div style={{fontSize:'small',marginLeft:'20px'}}>
              { objScreen.jliInfo }
            </div>
            
          </div>
          
        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
          <div style={{marginRight:'20px'}}>
            <ButtonSelector text={ objScreen.jliNoIncluir } actionClick={ ()=>{ handleNext(false) } }  />           
          </div>
          <div style={{marginLeft:'20px'}}>            
            <ButtonSelector text={ objScreen.jliIncluir } actionClick={ ()=>{ handleNext(true) } } icon='check' /> 
          </div>       
        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
          <ButtonSelector text={ objScreen.jliCondiciones } actionClick={ handleCondiciones } icon='conditions' enabled={ true }/> 
        </div>

    </div>
  )
}
