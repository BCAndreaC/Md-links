
const {mdLinks} = require('./index.js');
const pathUser = process.argv[2];

const { uniqueLinks, brokenLinks} = require('./util.js');
const colors = {
    fgCyan: '\x1b[36m',
    fgGreen: '\x1b[32m',
    fgRed: '\x1b[31m',
    reset: '\x1b[0m',
    fgMagenta: '\x1b[35m',
    fgYellow: '\x1b[33m',
    bgBlue: '\x1b[44m',
  };
const options = process.argv;


if (options.includes('--validate') && !options.includes('--stats')) {
    mdLinks(pathUser, { validate: true })
      .then((mdFiles) => {
        mdFiles.forEach((link) => {
          console.log(colors.fgGreen,'------------------------------', colors.reset);
          console.log('Href:', colors.fgCyan, link.href, colors.reset);
          console.log('Text:', link.text);
          console.log('File:', colors.fgMagenta , link.file, colors.reset);
          console.log('Status:', colors.fgYellow, link.statusText, colors.reset);
          console.log('Status Code:',colors.bgBlue ,link.status, colors.reset);
          console.log(colors.fgGreen,'------------------------------', colors.reset);
        });
      });
  } else if (!options.includes('--validate') && options.includes('--stats')) {
    mdLinks(pathUser, { stats: true })
      .then((mdFiles) => {
        const uniqueLink = uniqueLinks(mdFiles);
        console.log(colors.fgMagenta,'Total:', mdFiles.length, colors.reset);
        console.log(colors.fgCyan,'Unique:',uniqueLink.length, colors.reset);
      });
  } else if (options.includes('--stats') && options.includes('--validate')) {
    mdLinks(pathUser, { stats: true, validate: true  })
      .then((mdFiles) => {
        const uniqueLink = uniqueLinks(mdFiles);
        const brokenLink = brokenLinks(mdFiles);
        console.log(colors.fgMagenta,'Total:', mdFiles.length, colors.reset);
        console.log(colors.fgCyan,'Unique:', uniqueLink.length, colors.reset);
        console.log(colors.fgRed,'Broken:', brokenLink.length, colors.reset);
      });
  } else if (!options.includes('--validate') && !options.includes('--stats')) {
    mdLinks(pathUser, { validate: false  })
      .then((mdFiles) => {
    console.log('------------------------------');
    console.log(colors.fgCyan,'Links: ',colors.reset,mdFiles ,colors.fgCyan, 'File: ',colors.fgMagenta, pathUser,colors.reset);
    console.log('------------------------------');
       });
};
  

