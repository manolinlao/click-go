import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClickGo001Intro } from '../components/screens/ClickGo001Intro';
import { sessionInitalize } from '../actions/sessionActions';
import { ClickGoExit } from '../components/screens/ClickGoExit';
import { ClickGo001Info } from '../components/screens/ClickGo001Info';
import { ClickGo002Quote } from '../components/screens/ClickGo002Quote';
import { ClickGoMessage } from '../components/screens/ClickGoMessage';
import { ClickGo002ChangeImp } from '../components/screens/ClickGo002ChangeImp';
import { ClickGo002ChangePlz } from '../components/screens/ClickGo002ChangePlz';
import { ClickGo003Accounts } from '../components/screens/ClickGo003Accounts';
import { ClickGo004OfrecerSeviam } from '../components/screens/ClickGo004OfrecerSeviam';
import { ClickGo004SeviamCondiciones } from '../components/screens/ClickGo004SeviamCondiciones';
import { ClickGo005Confirm } from '../components/screens/ClickGo005Confirm';

export const ClickGoRouter = ( {sessionData} ) => {

  console.log('INCIO RUTAS');

  const dispatch = useDispatch(); 
  dispatch( sessionInitalize(sessionData) );

  return (  
    <Router>
    
        <div>
          <Routes>            
              <Route exact path="/" element={ <ClickGo001Intro/> }/>
              <Route exact path="/intro" element={ <ClickGo001Intro/> }/>
              <Route exact path="/info" element={ <ClickGo001Info/> }/>
              <Route exact path="/quote" element={ <ClickGo002Quote/> }/>
              <Route exact path="/changeImp" element={ <ClickGo002ChangeImp/> }/>
              <Route exact path="/changePlz" element={ <ClickGo002ChangePlz/> }/>
              <Route exact path="/accounts" element={ <ClickGo003Accounts/> }/>
              <Route exact path="/ofrecerSeviam" element={ <ClickGo004OfrecerSeviam/> }/>
              <Route exact path="/seviamCondiciones" element={ <ClickGo004SeviamCondiciones/> }/>
              <Route exact path="/confirm" element={ <ClickGo005Confirm/> }/>
              <Route exact path="/exit" element={ <ClickGoExit/> }/>
              <Route exact path="/message" element={ <ClickGoMessage/> }/>
              <Route path="/" element={ <Navigate replace to="/" /> } />
          </Routes>
        </div>
      
    </Router>        
  )
}

