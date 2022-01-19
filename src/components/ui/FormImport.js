import React from 'react';
import '../../styles/forms.css';

export const FormImport = ( { value } ) => {

 return (
    <div>      
      <input  
        type="text"                                                        
        name="formInputValue"
        value = { value }        
        autoComplete='off'
        readOnly
      />                       
    </div>
  )
}
