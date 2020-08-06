

// TODO LO DE MD LINKS

const fs = require("fs");
const path = require('path');  
const marked = require("marked"); 
const chalk = require('chalk');
const { clearScreenDown } = require("readline");
const fetchUrl = require("fetch").fetchUrl;
const nodeFetch = require('node-fetch'); 

// Ruta absoluta
let pathFile= process.argv[2];
pathFile = path.resolve(pathFile); 
pathFile = path.normalize(pathFile);


// Leyendo archivos .md

// fs.readdir('./', (error, files) => {
//     if(error){
//       throw error;
//       console.log(chalk.red("No existen archivos .md en este directorio"));
//     }
//     else{
//       files.forEach(file => {
//         if(path.extname(file) === ".md"){
//           console.log(chalk.blue.bold("Analizando archivo: ", file));
//           console.log("--------------------------------------------------")
//           readingLinks(file, path);
//         }
//       }) 
//     }
//   }); 

// Función que extrae links y los imprime

const readingLinks = () =>{
    fs.readFile(pathFile, 'utf-8', (error, data) => {
        if(error) {
          console.log('error: ', error);
        } else {

          const links = [];
          const renderer = new marked.Renderer();
          renderer.link  = (href, file, text) => {
            links.push({
              href:href,
              text:text,
              file:pathFile
            })
          }

          marked(data, { renderer : renderer });
          const urlLinks = links.filter(element => element.href.includes('http')); */
          
// Opciones

          let argv3 = process.argv[3];
          let argv4 = process.argv[4];
          if(argv3 == '-v' && argv4 == '-s' || argv4== '-v' && argv3 == '-s'){
            console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
            console.log(chalk.yellow.bold("Analizando archivo: ") + chalk.yellow(pathFile));
              console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
              totalLinks(urlLinks);
              totalBrokenLinks(links);
            }else if (argv3 == '-s' || argv3  == '-stats'){
              console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
              console.log(chalk.yellow.bold("Analizando archivo: ") + chalk.yellow(pathFile));
              console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
              totalLinks(urlLinks);
            }else if (argv3 == '-v' || argv3 == '-validate'){
              console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
              console.log(chalk.yellow.bold("Analizando archivo: ") + chalk.yellow(pathFile));
              console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
              validateLinks(urlLinks);
            }else{
              console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
              console.log(chalk.yellow.bold("Analizando archivo: ") + chalk.yellow(pathFile));
              console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
              console.log(chalk.yellow("Links que contiene tu archivo: "));
              console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
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
      '\n',
      chalk.black.bgGreen("Total de links: "),
      chalk.greenBright(numLinks.length),
      '\n',
      chalk.black.bgYellowBright("Total de links únicos: "),
      chalk.yellowBright(uniqueLinks.size),'\n'
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
    console.log('\n', chalk.black.bgRedBright("Total de links dañados: "), chalk.redBright(res),'\n')
  });
}

//Función para validar el estatus del link

const validateLinks = (links) => {
  links.map(element => {
    nodeFetch(element.href)
      .then(resp => {
        if (resp.status === 200) {
          console.log(chalk.greenBright('[✔]', 
          chalk.blue.bold('status:'), `${resp.status}`, 
          chalk.blue.bold('href:'), `${element.href}`, 
          chalk.blue.bold('text:'), `${element.text}`),'٩(^‿^)۶')
        } else if (resp.status === 404) {
          console.log(chalk.redBright('[X]', 
          chalk.blue.gray.bold('status:'), `${resp.status}`, 
          chalk.gray.bold('href:'), `${element.href}`, 
          chalk.gray.bold('text:'), `${element.text}`),'(╥﹏╥)')
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
    console.log(chalk.yellow.bold("------------------------------------------------------------------------------------------------------------------------------------------"))
  })
} 

module.exports = readingLinks();





 







