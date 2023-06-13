const mdLinks = require('../src/index.js');
const { validatePath, findMarkdownFiles, processMarkdownFile, validateURLs } = require('../src/util.js');
const fetch = require('node-fetch');
const path = require('path');
const pathUser = "E:/Git/Md-links/carpetaTest/test3.md";

jest.mock('node-fetch');


describe('mdLinks', () => {

  it('Debe de ser una función', () => {
   expect(typeof mdLinks).toBe('function');
  });
  it('Debe de devolver una promesa', () => {
    expect(mdLinks(pathUser)).toBeInstanceOf(Promise);
  });
  it('Debe devolver una promesa que se rechaza si no se ingresa una ruta', () => {
 return mdLinks()
  .catch((error) => {
    expect(error).toBe(error);
  });
});

}); 

