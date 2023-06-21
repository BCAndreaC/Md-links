const {  
  convertToAbsolutePath,
  readDir,
  readFileMd,
  validateURLs } = require('./util.js');
  const fs = require('fs');
  const path = require('path');

const pathUser = process.argv[2];

//Funcion para leer archivos .md
const mdLinks = (pathUser, options = {validate: false} ) => {
  return new Promise((resolve, reject) => {
    const absolutePath = convertToAbsolutePath(pathUser);
   let mdFiles = [];
    const stats = fs.statSync(absolutePath);
    if (stats.isDirectory()) {
      mdFiles = readDir(absolutePath);
    } else if (stats.isFile() && path.extname(absolutePath) === ".md") {
      mdFiles = [absolutePath];
    } else {
      reject("La ruta especificada no es un directorio ni un archivo .md válido.");
      return;
    }

    const promises = mdFiles.map((file) => {
      return readFileMd(file)
        .then((links) => {
          if (options.validate) {
            return validateURLs(links, file);
          } else {
            return links;
          }
        })
        //Si existe un error en readFileMd
        .catch((error) => {
          reject(error);
        });
    });

    Promise.all(promises)
      .then((results) => {
        const allLinks = results.flat();
        resolve(allLinks);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// mdLinks(pathUser, { validate: false })
//   .then((links) => {
//     console.log(links);
//   })
//   .catch((error) => {
//     console.error(error);
//   });




module.exports = {mdLinks};