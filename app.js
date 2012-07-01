
var express = require('express')
, io = require('socket.io')
, r = require('./router.js').router
, http = require('http');

app = express.createServer();

app.socketRouter = new r();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/register', function (req, res) {
  res.sendfile(__dirname + '/views/register.html');
});
require('./routes')

// Let's go!
app.listen(3000);

// Sockets
var sock = io.listen(app);

sock.sockets.on('connection', function (socket) {
  socket.on('register', function (handler) {
    app.socketRouter.register(handler, socket);
  });
});
