const fs = require("fs");
const path = require('path');  
const marked = require("marked"); 
const chalk = require('chalk');
const { clearScreenDown } = require("readline");
const fetchUrl = require("fetch").fetchUrl;
const links = [];

// Leyendo archivos .md
fs.readdir('./', (error, files) => {

    if(error){
      throw error;
      console.log(chalk.red("No existen archivos .md en este directorio"));
    }
    else{
      files.forEach(file => {
        if(path.extname(file) === ".md"){
          console.log(chalk.yellowBright.bold("Archivo con extensión md: ") + chalk.yellowBright(file));
          readingLinks(file, path);
        }
      }) 
    }
  }); 


// Función que extrae links y los imprime
const readingLinks = (file, path) =>{
    fs.readFile(file, 'utf-8', (error, data) => {
        if(error) {
          console.log('error: ', error);
        } else {
          const renderer = new marked.Renderer();
          renderer.link  = (href, file, title) => {
            links.push({
              href:href,
              file:file,
              title:title
            })
          }

          marked(data, { renderer : renderer });
          //httpLinks(links);
          //console.log(chalk.greenBright.bold("Links que contiene el archivo: "), httpLinks(links));
            /* Promise.all(links.map(link => httpStatus(link.href)))
            .then(resAll => {
              resAll.forEach( (res , index) => 
                console.log("El estado del link: ", links[index] , "es:",  res)
                )   
            })
            .catch(err => {
              console.log("No podemos verificar el estado");
            } )*/

            console.log(totalLinks(links));
 
          }
          
      });
}

// Función que filtra por prefijo http
const httpLinks = (links) =>{
    let httpLinks = [];
  links.map((element) => {
    let prefix = element.href.substring(0, 4);
    if (prefix == 'http') {
      httpLinks.push(element);
    }
  })
  return httpLinks;
  
};


// Función que suma el total de links y links únicos
const totalLinks = (links) => {
    let numberLinks = [];
  
    links.forEach(link => {
      numberLinks.push(link.href);
    });
    let uniqueLinks = new Set(numberLinks);
    console.log(
      chalk.black.bgGreenBright("Totales: "),
      chalk.greenBright(numberLinks.length),
      chalk.black.bgYellowBright("Únicos: "),
      chalk.yellowBright(uniqueLinks.size)
    );
  }

//Funcion que muestra el estado de los links
const httpStatus = (url) => {
  return new Promise ((resolve, reject) => {
    fetchUrl(url, (error, meta, body) => {
      if(error){
        reject(error);
      }
      else{
        resolve(meta.status);
      }
    });
  });
}


/* let url = httpLinks;
httpStatus(url)
  .then(res => {
    console.log("El estado del link: ", url , "es:",  res)
  })
  .catch(err => {
    console.log(err)
  }); */


