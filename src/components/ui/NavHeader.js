import React from 'react';
import '../../styles/header.css';
import { typesHeader } from '../../types/types';


export const NavHeader = ( {data} ) => {

  //Se determina el tipo para la barra de progreso
  let typeAnimation = '2';
  if(data.steps.length>0){   
    if(data.steps[0].mode===typesHeader.NAV_STEP_ACTIVE){
      typeAnimation = '1';
    }
    if(data.steps[data.steps.length-1].mode===typesHeader.NAV_STEP_ACTIVE){
      typeAnimation = '3';
    }
  }

  return (
    <div className='header-nav-main'>
            
      <div className='header-nav-main-title text-header-title'>
        { data.title }
      </div>
      
      {
        (data.steps.length>0)
        &&
        <div className='header-nav-items'>
          <div className='header-nav-items-graph'>
            <div className="header-progress"> 
              <div className={`header-progress-bar header-progress-animation${typeAnimation}`}></div>
            </div>
          </div>
          <div className='header-nav-steps'>
            {
              data.steps.map((step,i)=>{
                let classCSS = 'text-header-step header-nav-step';
                if(step.mode===typesHeader.NAV_STEP_ACTIVE){
                  classCSS = classCSS + ' header-nav-step-active';
                }else{
                  classCSS = classCSS + ' header-nav-step-inactive';
                }
                return(                  
                    <div className={ classCSS } key={i}>
                      {step.text}
                    </div>
                )
              })
            }
          </div>
        </div>        
      }
    </div>
  )
}
