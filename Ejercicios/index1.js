// Objetivo: leer un archivo y mostrar su contenido en consola
const fs = require('fs');
const filePath = 'E:/Git/Md-links/test.txt';

fs.readFile(filePath, 'utf8', (error, data) => {
  if (error) {
    console.error('Error al leer el archivo:', error);
  }
  else {
    console.log('Contenido del archivo:', data);
  }
});

