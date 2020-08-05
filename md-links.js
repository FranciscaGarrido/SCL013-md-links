const fs = require("fs");
const path = require('path');  
const marked = require("marked"); 
const chalk = require('chalk');
const { clearScreenDown } = require("readline");
const fetchUrl = require("fetch").fetchUrl;
const nodeFetch = require('node-fetch');

// Leyendo archivos .md

fs.readdir('./', (error, files) => {
    if(error){
      throw error;
      console.log(chalk.red("No existen archivos .md en este directorio"));
    }
    else{
      files.forEach(file => {
        if(path.extname(file) === ".md"){
          console.log(chalk.blue.bold("Analizando archivo: ", file));
          console.log("____________________________________")
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

          const links = [];
          const renderer = new marked.Renderer();
          renderer.link  = (href, file2, text) => {
            links.push({
              href:href,
              text:text,
              file:file
            })
          }

          marked(data, { renderer : renderer });
          const urlLinks = links.filter(element => element.href.includes('http'));
          
// OPCIONES

          let argv2 = process.argv[2];
          let argv3 = process.argv[3];
          if(argv2 == '-v' && argv3 == '-s' || argv3== '-v' && argv2 == '-s'){
              totalLinks(urlLinks);
              totalBrokenLinks(links);
              validateLinks(urlLinks);
            }else if (argv2 == '-s' || argv2  == '-stats'){
              totalBrokenLinks(links);
              totalLinks(urlLinks);
            }else if (argv2 == '-v' || argv2 == '-validate'){
              validateLinks(urlLinks);
            }else{
              console.log("Links que contiene su archivo: ");
              linksFile(urlLinks);
            }

          }   
      });
}

// Función que suma el total de links y links únicos

const totalLinks = (links) => {
    let numLinks = [];
  
    links.forEach(link => {
      numLinks.push(link.href);
    });
    let uniqueLinks = new Set(numLinks);
    console.log(
      chalk.black.bgGreen("Total: "),
      chalk.greenBright(numLinks.length),
      chalk.black.bgYellowBright("Unique: "),
      chalk.yellowBright(uniqueLinks.size)
    );
  }

//Función que calcula total de links rotos

const totalBrokenLinks = (links) => {
  const linksUrl = links.map((link) => link.href);
  let brokenLinks;
  let counterBroken = 0;
  linksUrl.forEach(element => {
    brokenLinks = nodeFetch(element)
      .then(resp => {
        if (resp.status !== 200) {
          counterBroken++
        }
        return counterBroken;
       
      })
      .catch(error => {
        console.log(error)
      });
  })
  brokenLinks.then((res) => {
    console.log(chalk.black.bgRed("Broken: "), chalk.redBright(res))
  });
}

//Función para validar el estatus del link

const validateLinks = (links) => {
  links.map(element => {
    nodeFetch(element.href)
      .then(resp => {
        if (resp.status === 200) {
          console.log(chalk.greenBright('[✔]', chalk.blue.bold('status:'), `${resp.status}`, chalk.blue.bold('href:'), `${element.href}`, chalk.blue.bold('text:'), `${element.text}`, chalk.blue.bold('file:'), `${element.file}`),'٩(^‿^)۶')
        } else if (resp.status === 404) {
          console.log(chalk.redBright('[X]', chalk.blue.gray.bold('status:'), `${resp.status}`, chalk.gray.bold('href:'), `${element.href}`, chalk.gray.bold('text:'), `${element.text}`, chalk.gray.bold('file:'), `${element.file}`),'(╥﹏╥)')
        }

      })
      .catch(error => {
        console.log(chalk.yellow('Link con errores', chalk.magenta('href:'), `${element.href}`, chalk.magenta('error:'), `${error}`))
      })
  })
};


//Mostrar solo los links del archivo
const linksFile = (urlLinks) => {
  urlLinks.map ((item) => {
    console.log(chalk.blue.bold("Link: "), item.href);
    console.log(chalk.blue.bold("Título: "), item.text);
    console.log(chalk.blue.bold("Archivo: "), item.file);
    console.log(chalk.yellow.bold("--------------------------------------------"))
  })
} 

