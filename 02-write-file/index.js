const { stdin, stdout, exit } = process;
const path = require('path');
const fs = require('fs');

const fileName = 'text.txt';

function write(output, data) {
  output.write(data.toString());
}
function sayBye() {
  write(stdout, `\nYour ${fileName} was created successfully, goodbye.`);
}
function checkFolder(fileName) {
  const filePath = path.join(__dirname);

  fs.readdir(filePath, (err, data) => {
    if (err) throw err;
    return data.toString().includes(fileName);
  });
}
function createFile(fileName) {
  const hasFile = checkFolder(fileName);

  if (!hasFile) {
    fs.open(fileName, 'w', (err) => {
      if (err) throw err;
    });
  }
  const filePath = path.join(__dirname, fileName);
  const output = fs.createWriteStream(filePath);
  const beforeInputMsg =
    '\nPlease, type any text and press "Enter" to add it to the file.\nPress "ctrl + c" or type "exit" to quit.\n';

  stdout.write(beforeInputMsg);
  stdin.on('data', (chunk) => {
    const string = chunk.toString();
    if (!(string.trim().toLowerCase() === 'exit')) {
      write(output, string);
    } else {
      exit();
    }
  });
  process.on('exit', () => sayBye());
  process.on('SIGINT', () => exit());
}

createFile(fileName);
