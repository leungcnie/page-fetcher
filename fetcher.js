const URL = process.argv[2];
const PATH = process.argv[3];
const request = require('request');
const fs = require("fs");


request(URL, (error, response, body) => {
  downloadFile(body);
});

const downloadFile = (data) => {
  fs.writeFile(PATH, data, (err) => {
    if (err) {
      console.log(err);
    } else {
      printSize(PATH);
    }
  })
}

const printSize = (file) => {
  const stats = fs.statSync(file);
  const fileSizeInBytes = stats.size;
  console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${PATH}`);
}

