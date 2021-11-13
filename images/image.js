// const request = require('request').defaults({ encoding: null });
var request = require("sync-request");
const download = (url) => {
  var res = request("GET", url);
  return res.getBody();
};

module.exports = {
  download: download,
};
