import { typesAction } from '../types/types';

const initialState = {
  lang: '',
  bornDate: '',
  personNumber: '',
  originAccount: '',
  transactionResult: '',
}

export const sessionReducer = ( state=initialState, action ) =>{
  switch(action.type){
    case typesAction.sessionInitialize:
      return action.payload;
    case typesAction.sessionFinalize:
      return {
        ...state,
        transactionResult:action.payload
      }
    default:
      return state;
  }
}