const { stdout } = process;
const fs = require('node:fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const reader = fs.createReadStream(filePath);
reader.on('data', (chunk) => {
  const splited = chunk.toString().split('. ').join('.\n');
  stdout.write('\n' + splited + '\n');
});
reader.on('error', (err) => {

    if(err.message.toString().startsWith('ENOENT')) {
        stdout.write('An error occurred: no such file or directory')
    } else {
        stdout.write(err)
    }
    
});
