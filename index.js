// module.exports = () => {
//   // ...
// };

const fs = require("fs");
const path = require('path');  
const marked = require("marked"); 
const chalk = require('chalk');

//AQUÍ SE LEEN LOS ARCHIVOS, EN ESTE CASO, "README" (lee el archivo que se le indique)

/* let fs = require('fs');
fs.readFile('README.md', 'utf-8', (error, data) => {
  if(error) {
    console.log('error: ', error);
  } else {
    console.log(data);
  }
}); */


//AQUÍ SE MUESTRAN TODOS LOS ARCHIVOS MD 
 
fs.readdir('./', (error, files) => {

  if(error){
    throw error;
    console.log(chalk.red("No existen archivos .md en este directorio"));
  }
  else{
    files.forEach(file => {
      if(path.extname(file) === ".md"){
        console.log(chalk.green("Archivo con extensión md: ") + chalk.yellow (file));
        fs.readFile(file, 'utf-8', (error, data) => {
          if(error) {
            console.log('error: ', error);
          } else {
            const links = [];
            const renderer = new marked.Renderer();
            renderer.link  = (href, text, file) => {
              links.push({
                href:href,
                //text:text,
                tittle:file
              })
            }
            marked(data, { renderer : renderer });
            //httpLinks(links);
            console.log("Links que contiene cada archivo: ",  links)
          }
        }); 
      }
    }) 
  }
});   




 







