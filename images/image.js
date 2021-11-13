// const request = require('request').defaults({ encoding: null });
var request = require("sync-request");
var sizeOf = require('buffer-image-size');

const download = (url) => {
  var res = request("GET", url);
  const buffer = res.getBody()
  return {
    buffer:buffer,
    dimensions:sizeOf(buffer)
  } 
};

module.exports = {
  download: download,
};
