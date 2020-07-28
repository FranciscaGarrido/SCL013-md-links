// module.exports = () => {
//   // ...
// };

const fs = require("fs");
const path = require('path');   

//AQUÍ SE LEEN LOS ARCHIVOS, EN ESTE CASO README (lee el archivo que se le indique)

/* let fs = require('fs');
fs.readFile('README.md', 'utf-8', (error, data) => {
  if(error) {
    console.log('error: ', error);
  } else {
    console.log(data);
  }
}); */


//AQUI SE MUESTRAN TODOS LOS ARCHIVOS MD (intentar mostrar txt igual)
 
fs.readdir('./', (error, files) => {

  if(error){
    throw error;
  }
  else{
    files.forEach(file => {
      if(path.extname(file) === ".md"){
        console.log("Estos son los archivos de extensión md: ", file);
      }
    }) 
  }

  
});   

//AQUI SE INTENTA LEER LOS ARCHIVOS

fs.readFile('file', 'utf-8', (error, data) => {
  if(error) {
    console.log('error: ', error);
  } else {
    console.log(data);
  }
}); 
 







