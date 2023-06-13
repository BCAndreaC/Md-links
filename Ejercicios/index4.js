//Objetivo unir dos rutas(paths) en una sola.

const path = require('path');
const pathDir = 'E:/Git/Md-links';
const pathFile = '/test.txt';

const pathJoin = path.join(pathDir, pathFile);
console.log('La ruta unida es:', pathJoin);