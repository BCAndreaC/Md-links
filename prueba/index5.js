//Crear una promesa que resuelva la ruta unida y lea el archivo.

const fs = require('fs');
const pathFile = 'E:/Git/md-links';

const readFile = (pathFile) => {
    return new Promise((resolve, reject) => {
        fs.readdir(pathFile, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

readFile(pathFile)
.then((data) => {
    console.log('Contenido del archivo:', data);
})
.catch((error) => {
    console.error('Error al leer el archivo:', error);
});