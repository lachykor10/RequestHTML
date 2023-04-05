// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

//usamos HTTP headers para obtener los datos necesitados
app.get('/api/whoami', (req, res)=>{
  const ip = req.headers["x-forwarded-for"] //obteniendo la ip de la cabecera
  const lenguaje = req.headers["accept-language"] //obteniendo el lenguage de la cabecera
  const soft = req.headers["user-agent"] //obteniendo el software usado o navegador
  
  //enviando en un json los datos introducidos en las variables
  res.json({ipaddress: ip, language: lenguaje, software:soft})
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
