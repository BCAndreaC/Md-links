const { validatePath, findMarkdownFiles, processMarkdownFile, validateURLs } = require('./util.js');
const pathUser = "E:/Git/Md-links/carpetaTest";
const path = require("path");


const mdLinks = (pathUser) => {
    // Validate path
    return validatePath(pathUser, 'directory')
      // Find Markdown files
      .then(() => findMarkdownFiles(pathUser))
      // Process each file
      .then((mdFiles) => {
        if (mdFiles.length > 0) {
          const promises = mdFiles.map((file) => {
            const filePath = path.join(pathUser, file);
            return processMarkdownFile(filePath)
              .then((urls) => {
                // Validate URLs
                if (urls) {
                  return validateURLs(urls, filePath);
                }
              });
          });
  
          return Promise.all(promises);
        }
      });
  };

mdLinks(pathUser);

module.exports = { mdLinks };