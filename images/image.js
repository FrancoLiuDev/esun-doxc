// const request = require('request').defaults({ encoding: null });
var request = require("sync-request");
var sizeOf = require('buffer-image-size');

const download = (url) => {
  var res = request("GET",encodeURI(url));
  const buffer = res.getBody()
  return {
    buffer:buffer,
    dimensions:sizeOf(buffer)
  } 
};

module.exports = {
  download: download,
  sdUrl:'http://localhost:3000/getfile?file=',
};
