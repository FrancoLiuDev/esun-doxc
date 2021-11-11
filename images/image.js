const request = require('request').defaults({ encoding: null });
const download = () => {
  return new Promise((resolve, reject) => {
    request.get(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/150px-NewTux.svg.png",
      function (err, res, body) {
        resolve(body);
      }
    );
    
  });
};

module.exports = {
    download: download,
};
