const URL = process.argv[2];
const PATH = process.argv[3];
const request = require('request');
const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.stat(PATH, (err, stats) => {
  if (err) {
    console.log("Failed: local file path invalid")
    process.exit();
  }
})

request(URL, (error, response, body) => {
  if (error) {
    console.log("Invalid URL. Error:\n", error);
    process.exit();
  } else if (response.statusCode !== 200) {
    console.log("Invalid URL. Status Code: ", response.statusCode);
    process.exit();
  }
  downloadFile(body);
});

const downloadFile = (data) => {
  if (fs.existsSync(PATH)) {
    rl.question("The file already exists. Overwrite file? (Y)  ", (answer) => {
      if (answer.toUpperCase() === 'Y') {
        rl.close();
        fs.writeFile(PATH, data, (err) => printSize(PATH));
      } else {
        console.log("Download aborted");
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

