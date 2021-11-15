// const request = require('request').defaults({ encoding: null });
var request = require("sync-request");
var sizeOf = require("buffer-image-size");
const fs = require("fs");
const downloadImage = (url) => {
  var res = request("GET", encodeURI(url));
  const buffer = res.getBody();
  return {
    buffer: buffer,
    dimensions: sizeOf(buffer),
  };
};
const downloadFile = (url, fileName) => {
  var res = request("GET", encodeURI(url));
  const buffer = res.getBody();
  console.log('buffer', buffer)
  fs.writeFileSync(fileName, buffer);
   
};
module.exports = {
  downloadImage: downloadImage,
  downloadFile: downloadFile,
  sdUrl: "http://localhost:3000/getfile?file=",
};
