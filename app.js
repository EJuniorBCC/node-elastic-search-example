var express = require('express');
var elasticsearch = require('elasticsearch');
var http = require('http');
var app = express();
var port = 3000;
var server = http.createServer(app);
var elastic = require('./modules/elasticsearch');
var routes = require('./routes');


app.use('/',routes);

elastic.init();	

server.listen(port, function() {
  console.log("Servidor iniciado na porta " + port);
});