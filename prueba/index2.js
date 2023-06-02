//Objetivo: Mostrar la extensión del archivo y su contenido en consola.
const fs = require('fs');
const filePath = 'E:/Git/Md-links/test.txt';

fs.readFile(filePath, 'utf8', (error, data) => {
    if(error){
        console.error('Error al leer el archivo:', error);
    } else {
    const extension = filePath.split('.').pop();
    console.log('La extensión del archivo es:', extension);
    console.log('Contenido del archivo:', data);
}});
