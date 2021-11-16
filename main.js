let express = require('express');
let app = express();
app.get('/getfile', function (req, res) {
    
  console.log("/getfile");
  const file = `files/${req.query.file}`;
  res.download(file); // Set disposition and send it.
})
 
let port = 3000;
app.listen(port);
