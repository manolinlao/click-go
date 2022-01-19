import React, { useCallback, useLayoutEffect, useRef } from 'react';
import '../../styles/quotesTable.css';



export const QuotesTable = ( { datos,functionSelected }) => {

  const divRef = useRef();

  console.log("QuotesTable");
  console.log(datos);

  //const [indexSelected,setIndexSelected] = useState(-1);

  const clickado = useCallback((e) =>{  
    console.log('en clickado');
    for(let i=0;i<12;i++){
      document.getElementById('id'+i).className='quote';  
    }
    document.getElementById(e.target.id).className='quote-clicked';
    const indexSelected = (e.target.id).substr(2,e.target.id.length);
    functionSelected(indexSelected);
  },[]);


  //TO_DO::crear bien el html a partir de los datos, aquí ya supongo que tengo el mockCalculsimulSI
  let strHtml =`<div class='quotes-container'><div></div>`;
  //primera fila - plazos
  for(let i=0;i<4;i++){
    strHtml = strHtml + `<div class="quote-plz">${datos[i].periodosAmort} meses</div>`;
  }
  //2ª,3ª,4ª fila  
  for(let i=0;i<3;i++){
    let index = (4*i);
    strHtml = strHtml + `<div class='quote-imp'>${datos[index].importe} €</div>
                         <div class='quote' id=id${index}>${(datos[index].cuota).replace('.',',')} €/mes</div>
                         <div class='quote' id=id${index+1}>${(datos[index+1].cuota).replace('.',',')} €/mes</div>
                         <div class='quote' id=id${index+2}>${(datos[index+2].cuota).replace('.',',')} €/mes</div>
                         <div class='quote' id=id${index+3}>${(datos[index+3].cuota).replace('.',',')} €/mes</div>`;
  }
  strHtml = strHtml + '</div>';
 

  useLayoutEffect(()=>{
    divRef.current.innerHTML = strHtml;
    for(let i=0;i<12;i++){
      document.getElementById("id"+i).addEventListener("click", clickado, false);
    } 
  },[clickado,strHtml]);


  return (
    <div ref={ divRef }>
      
    </div>
  )
}
