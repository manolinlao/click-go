import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ClickGoRouter } from './router/ClickGoRouter';
import { typesResult } from './types/types';


export const ClickGoAppContainer = ( clientData ) => {

  // dataApp se obtiene de la sesión del cliente
  clientData = {
    lang: 'CAS',
    bornDate: '05081937',
    personNumber: '123456789',
    originAccount: '1434312432431243124234',
    transactionResult: typesResult.END_OK
  }

  return (
    <Provider store={store}>     
      <div style={{backgroundColor:'white',width:'1024px'}}>
      <ClickGoRouter sessionData={ clientData }/>
      </div>    
    </Provider>
  )
}
