// module.exports = () => {
//   // ...
// };
  
let fs = require('fs');

fs.readFile('README.md', 'utf-8', (error, data) => {
  if(error) {
    console.log('error: ', error);
  } else {
    console.log(data);
  }
});
