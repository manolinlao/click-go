import { typesAction } from '../types/types';

const initialState = {
  clickgoImport: 0,
  initialData:{
    loaded:false,
    min:0,
    max:0,
  },
  datosAdmisionActivo:{
    minPeriodos:0,
    maxPeriodos:0,
    numDatos:0,
    listaSimulacion:[{importe:'',periodosAmort:'',codOferta:'',resultadosSim:'',cuota:'',indSeviam:''}]
  },
  datosAdmisionActivoSelected:0,
  cuentaAbono:'',
  seviam:{
    tipo:'ANUAL',
    contratar:false,
    cuota:'3715',
  }
}

export const clickgoDataReducer = ( state=initialState, action ) =>{
  switch(action.type){  
    case typesAction.clickgoDataSetImport:
      return {
        ...state,
        clickgoImport: action.payload
      }
    case typesAction.clicgoDataSetInitialData:
      return{
        ...state,
        initialData: action.payload
      }

    case typesAction.clickgoDataSetDatosAdmisionActivo:
      return{
        ...state,
        datosAdmisionActivo:action.payload
      }
    case typesAction.clickgoDataResetDatosAdmisionActivo:
      return{
        ...state,
        datosAdmisionActivoSelected:0,
        datosAdmisionActivo:action.payload
      }
    case typesAction.clickgoDataSetDatosAdmisionActivoSelected:
      return{
        ...state,
        datosAdmisionActivoSelected:action.payload
      }
    case typesAction.clickgoDataSetCuentaAbono:
      return{
        ...state,
        cuentaAbono:action.payload
      }
    case typesAction.clickgoDataSetContratar:
      return{
        ...state,
        seviam:action.payload
      }
    default:
      return state;
  }
}