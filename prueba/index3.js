//objetivo buscar contenido de un directorio

const fs = require('fs');
const dirFiles = 'E:/Git/Md-links';

fs.readdir(dirFiles, 'utf8', (error, files) => {
    if (error) {
        console.error('Error al leer el directorio:', error);
    } else {
        console.log('Contenido del directorio:', files);
    }
});