import { typesAction } from "../types/types";

export const clickgoDataSetImport = ( imp ) => ({
  type: typesAction.clickgoDataSetImport,
  payload: imp-0
})

export const clickgoDataSetInitialData = ( initialData ) => ({
  type: typesAction.clicgoDataSetInitialData,
  payload: initialData
})

export const clickgoDataSetDatosAdmisionActivo = ( data ) => ({
  type:typesAction.clickgoDataSetDatosAdmisionActivo,
  payload:data
})

export const clickgoDataResetDatosAdmisionActivo = () =>{
  const resetData = {
      minPeriodos:0,
      maxPeriodos:0,
      numDatos:0,
      listaSimulacion:[{importe:'',periodosAmort:'',codOferta:'',resultadosSim:'',cuota:'',indSeviam:''}]
  }

  return{
    type:typesAction.clickgoDataResetDatosAdmisionActivo,
    payload:resetData
  }
  
}

export const clickgoDataSetDatosAdmisionActivoSelected = ( data ) => ({
  type:typesAction.clickgoDataSetDatosAdmisionActivoSelected,
  payload:data
})

export const clickgoDataSetCuentaAbono = ( cuenta ) => ({
  type:typesAction.clickgoDataSetCuentaAbono,
  payload:cuenta
})

export const clickgoDataSetContratar = ( seviamObj ) => ({
  type:typesAction.clickgoDataSetContratar,
  payload:seviamObj
})