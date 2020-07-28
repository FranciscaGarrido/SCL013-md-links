// module.exports = () => {
//   // ...
// };

/*   

//Lee el archivo README o el archivo que se le indique

/* let fs = require('fs');
fs.readFile('README.md', 'utf-8', (error, data) => {
  if(error) {
    console.log('error: ', error);
  } else {
    console.log(data);
  }
}); */


// MUESTRA TODOS LOS ARCHIVOS

const fs = require("fs");
fs.readdir('./', (error, files) => {

  if(error){
    throw error;
  }
  console.log(files);
});
 







