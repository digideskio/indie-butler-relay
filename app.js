
var express = require('express')
, io = require('socket.io')
, r = require('./router.js').router
, http = require('http');

app = express.createServer();
app.sock = io.listen(app);
app.socketRouter = new r();

// Configuration
app.configure(function(){
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
require('./routes')

// Let's go!
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on", port);

