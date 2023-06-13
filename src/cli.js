
const {mdLinks} = require('./index.js');
const pathUser = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];

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


if (option1.includes('--validate')) {
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
  } else if (option1.includes('--stats')) {
    mdLinks(pathUser, { validate: false })
      .then((links) => {
        console.log('File:', links.file);
        console.log('Total:', links.length);
        console.log('Unique:', uniqueLinks(links).length);
      });
  } else if (option1.includes('--stats') && option2.includes('--validate')) {
    mdLinks(pathUser, { validate: true })
      .then(() => {
        console.log('File:', filePath);
        console.log('Total:', totalLinks);
        console.log('Unique:', uniqueLinks);
        console.log('Broken:', brokenLinks);
      });
  } else {
    console.log('------------------------------');
    console.log('You can use --validate, --stats, or --validate --stats.');
    console.log('------------------------------');
  }
  
