/*
  se le pasa un string con ~, y seguidamente todas las posibilidades
*/
export const getFilledString = (strToFill, ...fillers) => {
  let strFilled = strToFill;  
  try{
    for(let i=0; i<fillers.length;i++){      
      strFilled = strFilled.replace('~',fillers[i]);
    }
  }catch(e){
    console.log('utils.js::getFilledString::exception = ' + e);
  }
  return strFilled;
}


/**
 * se le pasa un importe sin formatear y lo retorna formateado
 * ej: 1000 -> 1.000
 * 
 * NOTA:usa formato alemán porque es el que pone los puntos donde nos interesa
 */
export const formatImport = (str) => {
  return new Intl.NumberFormat('de-DE',{style:'decimal'}).format(str);
}

export const formatImportNotZero = (str) => {
  let tmp = new Intl.NumberFormat('de-DE',{style:'decimal'}).format(str) + '';
 
  if(tmp==='0'){
    return '';
  }
  return tmp;
}

export const formatCentieuros = (str)=>{
  // ccc -> c,cc cc-> '0,cc c-> 0,0c
  if(str.length===1) return '0,0' + str;
  if(str.length===2) return '0,' + str;
  return (str.substring(0,str.length-2)+","+str.substring(str.length-2,str.length));
}