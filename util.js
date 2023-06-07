//Leer el path del usuario

const path = require("path");
const fs = require("fs");
const axios = require("axios");


//Leer el directorio
const readDir = (pathUser) => {
  return new Promise((resolve, reject) => {
    fs.readdir(pathUser, (error, data) => {
      if (error) {
        reject(error);
        return;
      } 
        resolve(data);
        
    });
  } );
};


//leer archivos con extensión .md
const readFile = (pathUser) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathUser, "utf8", (error, data) => {
      if (error) {
        reject(error);
        return;
      } 
      const extFile = path.extname(pathUser);
      if(extFile === ".md"){
        resolve(data);
      } else {
        reject("No es un archivo .md");
      }
    });
  });
};

//Validar si es un directorio
const validDir = (pathUser) => {
  return new Promise((resolve, reject) => {
    fs.stat(pathUser, (error, stats) => {
      if (error) {
        reject(error);
        return;
      }
      if (stats.isDirectory()) {
        resolve(pathUser);
      } else {
        reject("No es un directorio");
      }
    });
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

//Leer cada URL dentro de los archivos .md
const readUrl = (filePath) => {
  return new Promise((resolve, reject) => {
    // Aquí deberías implementar la lógica para leer la URL del archivo
    // y luego llamar a la función validateURL para validarla

    // Por ejemplo, supongamos que la URL está en la primera línea del archivo
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      validateUrl(url)
        .then((isValid) => {
          if (isValid) {
            console.log('La URL', url, 'es válida');
          } else {
            console.log('La URL', url, 'está rota o no es accesible');
          }
          resolve();
        })
        .catch((error) => {
          console.error('Error al validar la URL', url, ':', error);
          resolve();
        });
    });
  });
};





    module.exports = { validDir, readDir, readFile, readUrl,validateUrl };