import {combineReducers} from 'redux';
import { clickgoDataReducer } from './clickgoDataReducer';
import { messageReducer } from './messageReducer';
import { sessionReducer } from './sessionReducer';


export const rootReducer = combineReducers({    
    session: sessionReducer,
    clickgoData: clickgoDataReducer,
    message: messageReducer,
})

