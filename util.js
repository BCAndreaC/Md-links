//Leer el path del usuario

const path = require("path");
const fs = require("fs");
const http = require("http");

const pathUser = "E:/Git/Md-links/carpeta/test.md";

//Leer el path del usuario
const readDir = (pathUser) => {
  return new Promise((resolve, reject) => {
    fs.readdir(pathUser, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

readDir(pathUser)
  .then((data) => {
    console.log("Contenido del directorio:", data);
  })
  .catch((error) => {
    console.error("Error al leer el directorio:", error);
  });

const readFile = (pathUser) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathUser, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

readFile(pathUser)
    .then((data) => {
        console.log('Contenido del archivo:', data);
    })
    .catch((error) => {
        console.error('Error al leer el archivo:', error);
    });
