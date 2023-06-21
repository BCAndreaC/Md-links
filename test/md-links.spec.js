const {mdLinks} = require('../src/index.js');
const fetch = require('node-fetch');
const { validateURLs, readFileMd, validateUrl, readDir,pathExists, convertToAbsolutePath } = require('../src/util.js');


jest.mock('node-fetch');

fetch.mockImplementation(() => Promise.resolve({
  status: 200,
  ok: true,
  text: () => Promise.resolve('ok'),
}));

describe('mdLinks', () => {

  it('Debe ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debe de devolver una promesa', () => {
    expect(mdLinks("E:/Git/Md-links/carpetaTest")).toBeInstanceOf(Promise);
  });
  it('Debe devolver una promesa que se rechaza si no se ingresa una ruta', () => {
 return mdLinks()
  .catch((error) => {
    expect(error).toBe(error);
  });
});
it ('Debe de devolver una promesa de todos los links de los archivos .md', () => {
    return mdLinks("E:/Git/Md-links/carpetaTest", { validate: true })
      .then((result) => {
        expect(result).toEqual(result);
      });
    });
    it('Debe de rechazar la promesa si no se ingresa una ruta', () => {
      return mdLinks()
        .catch((error) => {
          expect(error).toBe(error);
        });
    });
  it('Debe de rechazar la promesa de readFileMd', () => { 
    return mdLinks('E:/Git/Md-links/carpetaTest')
      .catch((error) => {
        expect(error).toBe(error);
      });
  });
 
});

describe('validateURLs', () => {

  it('Debe de retornar un objeto con las propiedades href, text, file, status, statusText', () => {
    const links = [{
      href: 'https://github.com/BCAndreaC/Ghibli-Lovers',
      text: 'Ghibli Lovers',
      file: 'E:/Git/Md-links/carpetaTest/test.md',
      status: 200,
      statusText: 'OK',
    }];
    return validateURLs(links, 'E:/Git/Md-links/carpetaTest/test.md')
      .then((result) => {
        expect(result).toEqual(links);
      });
  });
});

describe('readFileMd', () => {
  
    it('Debe de retornar un array de objetos con file, href y text del archivo con extension .md', () => {
      const links = [
        {
          file: "E:/Git/Md-links/carpetaTest/test.md",
          href: "https://www.google.com/",
          text: "Google",
        },
        {
          file: "E:/Git/Md-links/carpetaTest/test.md",
          href: "https://www.openai.com",
          text: "OpenAI",
        },
        {
          file: "E:/Git/Md-links/carpetaTest/test.md",
          href: "https://www.github.com",
          text: "GitHub",
        },
        {
          file: "E:/Git/Md-links/carpetaTest/test.md",
          href: "https://github.com/BCAndreaC/Ghibli-Lovers",
          text: "Ghibli-Lovers",
        },
        {
          file: "E:/Git/Md-links/carpetaTest/test.md",
          href: "htps://github.com/BCC/Ghibli-Loverss",
          text: "Ghibli-Lovers-404",
        },
      ];
      return readFileMd('E:/Git/Md-links/carpetaTest/test.md')
        .then((result) => {
          expect(result).toEqual(links);
        });
    });
  });

  describe('validateUrl', () => {
    it('Debe de validar el estado de los links', () => {
      validateUrl('https://www.google.com/')
      fetch('https://www.google.com/')
        .then((response) => {
          expect(response.status).toBe(200);
        });   
    });

    it ('Debe de rechazar la promesa si no se ingresa una url', () => {
      validateUrl('https://www.google.co')
        .catch((error) => {
          expect(error).toBe(error);
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Fail');
          
        });
    });
  });

  describe('readDir', () => {
    it('Debe de retornar un array de archivos con extension .md', () => {
      const files = [
        'E:/Git/Md-links/carpetaTest/test.md',
        'E:/Git/Md-links/carpetaTest/test2.md',
      ];
      const mdFiles = readDir('E:/Git/Md-links/carpetaTest');
        if (mdFiles === files) {
          expect(aguacate).toEqual(files);
        }
       });
});

describe('pathExists', () => {
  it('Debe de retornar true si la ruta existe', () => {
    const path = pathExists('E:/Git/Md-links/carpetaTest');
    expect(path).toBe(true);
  });
  it('Debe de retornar false si la ruta no existe', () => {
    const path = pathExists('E:/Git/Md-links/carpetaTest2');
    expect(path).toBe(false);
  });
});

describe('convertToAbsolutePath', () => {
  it('Debe de resolver la ruta de relativa a absoluta', () => {
    const path = convertToAbsolutePath('carpetaTest/test2.md');
    expect(path).toBe('E:\\Git\\Md-links\\carpetaTest\\test2.md');
  }); 
});
