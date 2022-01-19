import { typesAction } from '../types/types';

const initialState = {
  txt:'',
  type:'',
  timeToShow:'',
  closeButton: false,
  txtButton: '',
  after:''
}

export const messageReducer = ( state=initialState, action ) =>{
  switch(action.type){
    case typesAction.messageShow:
      return {
        ...state,
        txt:action.payload.txt,
        type:action.payload.type,
        timeToShow:action.payload.time,
        closeButton: action.payload.closeButton,
        txtButton: action.payload.txtCloseButton,
        after:action.payload.after,
      }    
    default:
      return state;
  }
}