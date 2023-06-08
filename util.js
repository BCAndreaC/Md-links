const fs = require("fs");
const fetch = require("node-fetch");
const colors = {
  fgCyan: '\x1b[36m',
  fgGreen: '\x1b[32m',
  fgRed: '\x1b[31m',
  reset: '\x1b[0m',
};


//Leer el directorio
const readDir = (path) => {
  // Siempre que se trabaje con archivos se debe utilizar un try/catch
  try {
    // Leer el directorio y guardar el resultado en una variable
    const files = fs.readdirSync(path);
    // Retornar el resultado
    return files;
  } catch (error) {
    // Lanzar el error para que sea capturado por el catch
    throw error;
  }
};

//Validar si es un directorio o archivo 
// validatePath is a function that receives a path and a type (file or directory) and returns a promise
const validatePath = (path, expectedType) => {
  return new Promise((resolve, reject) => {
    // stat is an asynchronous function that returns information about the path
    fs.stat(path, (error, stats) => {
      if (error) {
        reject(error);
        return;
      }
      // The stats object contains information about the path
      const isDirectory = stats.isDirectory();
      const isFile = stats.isFile();
      if (expectedType === 'directory' && isDirectory) {
        resolve(path);
      } else if (expectedType === 'file' && isFile) {
        resolve(path);
      } else {
        // If the path is not valid, reject the promise
        const errorType = expectedType === 'directory' ? 'directorio' : 'archivo';
        reject(`La ruta no es un ${errorType} válido`);
      }
    });
  });
};

//leer archivos 
const readFile = (pathUser) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathUser, "utf8", (error, data) => {
      if (error) {
        reject(error);
        return;
      } 
      resolve(data);
    });
  });
};


//Buscar archivos con extensión .md
const findMarkdownFiles = (path) => {
  return Promise.resolve(readDir(path))
    .then((files) => {
      return files.filter((file) => file.endsWith('.md'));
    });
};

//Validar si es una URL
const validateUrl = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        const status = response.status;
        const statusText = status === 200 ? 'OK' : 'Fail';
        resolve({ status, statusText });
      })
      .catch((error) => {
        const status = 404; // Not Found
        const statusText = 'Fail';
        reject({ status, statusText, error });
      });
  });
};

//Lectura de un archivo y busqueda de URLs dentro de él
const processMarkdownFile = (filePath) => {
  return readFile(filePath)
    .then((data) => {
  let urls = [];
      //Regex para encontrar su texto y su URL 
      const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const matches = data.match(regex);
//Si encuentra coincidencias, las guarda en un array
      if (matches) {
        urls = matches.map((match) => {
          //Regex para encontrar la primera coincidencia de texto y URL
          const parts = match.match(/\[([^\]]+)\]\(([^)]+)\)/);
         
         urls.push(parts[1], parts[2]);
          return {
            text: parts[1],
            url: parts[2],
          };
        });

        return urls;
      } else {
        console.log(colors.fgRed,'No se encontraron URLs en el archivo', filePath, colors.reset);
      }
    })
    .catch((error) => {
      console.error(colors.fgRed, 'Error al leer el archivo', filePath, ':', error, colors.reset);
    });
};

//Validar si la URL es correcta o no el status
const validateURLs = (urls, filePath) => {
  const urlPromises = urls.flatMap((urlInfo) => {
    return validateUrl(urlInfo.url)
      .then(({ status }) => {
        console.log('------------------------------');
        console.log('Href:', colors.fgCyan, urlInfo.url, colors.reset);
        console.log('Text:', urlInfo.text);
        console.log('File:', filePath);
        console.log('Status:', colors.fgGreen, 'Ok', colors.reset);
        console.log('Status Code:', status);
      })
      .catch((error) => {
        console.error('------------------------------');
        console.error('Href:', colors.fgCyan, urlInfo.url, colors.reset);
        console.error('Text:', urlInfo.text);
        console.error('File:', filePath);
        console.error('Status:', colors.fgRed, 'Fail', colors.reset);
        console.error('Status Code:', error.status);
      });
  });

  return Promise.all(urlPromises);
};

    module.exports = { validatePath, findMarkdownFiles, processMarkdownFile, validateURLs };