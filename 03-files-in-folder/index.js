const fs = require('fs');
const path = require('path');
const { stdout } = process;

function checkFolder() {
  const folderPath = path.join(__dirname, 'secret-folder');

  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    
    files.forEach((file) => {
      const filePath = path.join(folderPath, file.name);

      if (file.isFile()) {
        const fileName = file.name.slice(0, file.name.indexOf('.'));
        const fileExt = path.extname(filePath).slice(1);

        fs.stat(filePath, (err, stats) => {
          if (err) throw err;
          stdout.write(`${fileName} - ${fileExt} - ${stats.size}B\n`);
        });
      }
    });
  });
}
checkFolder();
