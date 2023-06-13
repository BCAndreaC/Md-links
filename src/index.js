const {    pathExists, 
  convertToAbsolutePath,
  readDir,
  readFileMd,
  validateURLs, } = require('./util.js');

const pathUser = process.argv[2];

//Funcion para leer archivos .md
const mdLinks = (pathUser, options) => {
  return new Promise((resolve, reject) => {
    const absolutePath = convertToAbsolutePath(pathUser);
    const mdFiles = readDir(absolutePath);

    const promises = mdFiles.map((file) => {
      return readFileMd(file)
        .then((links) => {
          if (options) {
            return validateURLs(links, file);
          } else {
            return links;
          }
        })
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

mdLinks(pathUser, { validate: true })
  .then((links) => {
    // console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });




module.exports = {mdLinks};