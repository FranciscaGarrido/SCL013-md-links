// module.exports = () => {
//   // ...
// };

const fs = require("fs");
const path = require('path');  
const marked = require("marked"); 

//AQUÍ SE LEEN LOS ARCHIVOS, EN ESTE CASO README (lee el archivo que se le indique)

/* let fs = require('fs');
fs.readFile('README.md', 'utf-8', (error, data) => {
  if(error) {
    console.log('error: ', error);
  } else {
    console.log(data);
  }
}); */


//AQUÍ SE MUESTRAN TODOS LOS ARCHIVOS MD (intentar mostrar txt igual)
 
fs.readdir('./', (error, files) => {

  if(error){
    throw error;
  }
  else{
    files.forEach(file => {
      if(path.extname(file) === ".md"){
        console.log("Estos son los archivos de extensión md: ", file);
        fs.readFile(file, 'utf-8', (error, data) => {
          if(error) {
            console.log('error: ', error);
          } else {
            const links = [];
            const renderer = new marked.Renderer();
            renderer.link  = (href, text, file) => {
              links.push({
                href:href,
                text:text,
                file:file
              })
            }
            marked(data, { renderer : renderer });
            //links = httpLinks(links);
            console.log(links)
          }
        }); 
      }
    }) 
  }
});   



 







