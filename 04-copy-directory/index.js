const fs = require('fs');
const path = require('path');

function makeCopy() {
  const sourceDir = path.join(__dirname, 'files');
  const destDir = sourceDir + '-copy';
  fs.rm(destDir, { recursive: true }, () => {
    fs.mkdir(destDir, { recursive: true }, (err) => {
      if (err) console.log('mkdir error');
      fs.readdir(sourceDir, { withFileTypes: true }, (err, files) => {
        if (err) console.log('readdir error');
        files.forEach((file) => {
          const dest = path.join(destDir, file.name);
          const src = path.join(file.path, file.name);
          fs.copyFile(src, dest, (err) => {
            if (err) console.log(err);
          });
        });
      });
    });
  });
}
makeCopy();
