export const typesAction = {
  sessionInitialize: '[session] Initialize',
  sessionFinalize: '[session] Finalize',

  clickgoDataSetImport: '[clickgoData] Set Import',
  clicgoDataSetInitialData: '[clickgoData] Set initial data',
  clickgoDataSetDatosAdmisionActivo: '[clickgoData] Set datos admision activo',
  clickgoDataResetDatosAdmisionActivo: '[clickgoData] Reset datos admision activo',
  clickgoDataSetDatosAdmisionActivoSelected: '[clicgoData] Set datos admision activo selected',
  clickgoDataSetCuentaAbono: '[clicgoData] Set cuenta abono',
  clickgoDataSetContratar: '[clickgoData} Set contratar',

  messageShow: '[nok] Show message',
  
}

export const typesButton = {
  HOME: 'home',
  EXIT: 'exit',
  BACK: 'back'
}

export const typesHeader = {
  NAV_STEP_ACTIVE: "active",
  NAV_STEP_PAST: "past",
  NAV_STEP_GREY: "grey",
}

export const typesResult = {
  END_OK: '[result] OK',
  END_NOK: '[result] NOK',
  ERROR_CODE: '[result] Error in code',
  EXIT_HOME: '[result] Exit - go to home',
  EXIT_END: '[result] Exit- End'
}

export const typesMessage = {
  INFO: 'info',
  ALERT: 'alert',
  MESSAGE:'message',
  PRINT:'print'
}

export const typesAfterMessage = {
  BACK: 'back',
  EXIT: 'exit'
}