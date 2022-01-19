import { typesAction } from "../types/types";

export const showMessage = ( txt, type, time, closeButton,txtCloseButton, after ) =>({
    type: typesAction.messageShow,
    payload: {txt,type,time,closeButton,txtCloseButton,after}
})  

