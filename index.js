
const { validDir, readDir, readFile, validateUrl } = require('./util.js');

const pathUser = "E:/Git/Md-links/carpetaTest";
const colors = {
  fgCyan: '\x1b[36m',
  fgGreen: '\x1b[32m',
  fgRed: '\x1b[31m',
  reset: '\x1b[0m',
};

const mdLinks = (pathUser) => {
    //Validar si es un directorio
  validDir(pathUser)
    .then(() => {
        //Lista de archivos en el directorio
      return readDir(pathUser);
    })
    //Se filtran los archivos con extensión .md
    .then((files) => {
      const mdFiles = files.filter((file) => file.endsWith('.md'));
//Se lee cada archivo .md
      if (mdFiles.length > 0) {
        const promises = mdFiles.map((file) => {
          const filePath = pathUser + '/' + file;
          return readFile(filePath)
          //Se buscan las URL dentro de cada archivo .md
            .then((data) => {
                //regex para buscar las URL
              const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
              const matches = data.match(regex);

              if (matches) {
                const urls = matches.map((match) => {
                    //Se separa el texto de la URL
                  const parts = match.match(/\[([^\]]+)\]\(([^)]+)\)/);
                  return {
                    text: parts[1],
                    url: parts[2],
                  };
                });
                //
                
                const urlPromises = urls.flatMap((urlInfo) => {
                    return validateUrl(urlInfo.url)
                      .then(({ status}) => {
                        console.log('------------------------------');
                        console.log('Href:',colors.fgCyan, urlInfo.url, colors.reset);
                        console.log('Text:', urlInfo.text);
                        console.log('File:', filePath);
                        console.log('Status:',colors.fgGreen, 'Ok', colors.reset);
                        console.log('Status Code:', status);
                      })
                      .catch((error) => {
                        console.error('------------------------------');
                        console.error('Href:',colors.fgCyan, urlInfo.url, colors.reset);
                        console.error('Text:', urlInfo.text);
                        console.error('File:', filePath);
                        console.error('Status:',colors.fgRed, 'Fail', colors.reset);
                        console.error('Status Code:', error.status);
                      });
                  });

                return Promise.all(urlPromises);
              }
            })
            .catch((error) => {
              console.error(colors.fgRed, 'Error al leer el archivo', filePath, ':', error);
            });
        });

        return Promise.all(promises);
      } else {
        console.log(colors.fgRed, 'No se encontraron archivos .md en el directorio', pathUser);
      }
    })
    .catch((error) => {
      console.error(colors.fgRed, 'Error al leer el directorio', pathUser, ':', error);
    })
};
    

mdLinks(pathUser);
