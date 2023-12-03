const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function copyFilesByExtension(sourceDir, targetDir, extensions) {
  try {
    const files = await readdir(sourceDir);

    const filteredFiles = files.filter(file => {
      const ext = path.extname(file);
      return extensions.includes(ext);
    });

    await Promise.all(filteredFiles.map(async file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      await copyFile(sourcePath, targetPath);
    }));

    console.log('Files copied successfully!');
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

const [,, sourceDir, targetDir, ...extensions] = process.argv;

copyFilesByExtension(sourceDir, targetDir, extensions);