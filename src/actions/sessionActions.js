import { typesAction } from "../types/types";

export const sessionInitalize = ( data ) =>({
    type: typesAction.sessionInitialize,
    payload: data
})  

export const sessionFinalize = ( endCause ) =>({
  type: typesAction.sessionFinalize,
  payload: endCause
})