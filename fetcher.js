const URL = process.argv[2];
const PATH = process.argv[3];
const request = require('request');
const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(URL, (error, response, body) => {
  downloadFile(body);
});

const downloadFile = (data) => {
  if (fs.existsSync(PATH)) {
    rl.question("The file already exists. Overwrite file? (Y)  ", (answer) => {
      if (answer.toUpperCase() === 'Y') {
        rl.close();
        fs.writeFile(PATH, data, (err) => printSize(PATH));
      } else {
        rl.close();
      }
    });
  } else {
    r1.close();
    fs.writeFile(PATH, data, (err) => printSize(PATH));
  }
}

const printSize = (file) => {
  const stats = fs.statSync(file);
  const fileSizeInBytes = stats.size;
  return console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${PATH}`);
}

