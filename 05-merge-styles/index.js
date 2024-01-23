const fs = require('fs');
const path = require('path');
const destDir = path.join(__dirname, 'project-dist');
const sourceDir = path.join(__dirname, 'styles');

function createBundle(source, dest) {
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    const arr = [];
    files.forEach((entry) => {
      const isFile = entry.isFile();
      const fileExt = path.extname(entry.name);

      if (isFile && fileExt === '.css') {
        arr.push(entry);
      }
    });
    arr.forEach((file) => {
      const filePath = path.join(source, file.name);
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;
        const fileName = 'bundle.css';
        const fileP = path.join(dest, fileName);
        fs.unlink(fileP, () => {
          fs.appendFile(fileP, data, (err) => {
            if (err) throw err;
          });
        });
      });
    });
  });
}
createBundle(sourceDir, destDir);
