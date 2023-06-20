var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile('index.html');
  });


  var server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Express running on ${server.address().port} in ${app.settings.env}`);
  })
