var express = require('express')
, io = require('socket.io')
, r = require('./router.js').router
, http = require('http')
, relme = require('relmeauth')
, url = require('url')
, conf = require(__dirname + '/conf.js');

app = express.createServer();
app.sock = io.listen(app);
app.socketRouter = new r();

// Configuration
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "A secret for the Sessions encryption"
  }));
  app.use(app.router);
  app.use(relme.middleware(conf.relmeauth));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

/*
  Authenticating (matching a socket and a domain) to the butler server.
*/
app.get('/connect', function(request, response) {
  if(request.session.relMeAuthed) {
    var socket = app.socketRouter.sockets[request.query.sid];
    if(socket) {
      socket.handler = request.session.me;
      app.socketRouter.register(request.session.me, socket);
      if(request.query.human) {
        response.send('Successfully connected as ' +  request.session.me, {}, 201);
      }
      else {
        response.send({bound: true, domain: request.session.me}, {'Content-Type': 'application/json'}, 201);
      }
    }
    else {
      response.send('We do not have any socket for you.', 500);
    }
  }
  else {
    request.session.indieAuthOrigin = '/connect?human=true&sid=' + request.query.sid;
    request.session.me = request.query.me;
    response.send({bound: false}, {'Content-Type': 'application/json'}, 201);
  }
});

/*
  Connecting a socket.
*/
app.sock.sockets.on('connection', function (socket) {
  app.socketRouter.add(socket);
  socket.emit('session', socket.id);
  // When the butler disconnects
  socket.on('disconnect', function () {
    app.socketRouter.remove(socket);
    app.socketRouter.unregister(socket.handler);
  });
});

/*
  Catch all routes. Will proxy the requests to the right socket.
*/
app.get('/*', function(req, res, next) {
  var p = '/'
  if (req.params[0]) {
    p += req.params[0]
  }
  var host = req.header('host').match(/local\.(.*)/);
  var hostname = host && host[1] ? host[1].split(':')[0] : null;
  if(hostname && app.socketRouter.routeExists(hostname)) {
    app.socketRouter.route(hostname, {method: 'get', headers: req.headers, path: p}, function(response) {
      res.send(response.body, response.headers, response.status || 200)
    });
  }
  else {
    next();
  }
});

// Let's go!
var port = process.env.PORT || conf.port;
app.listen(port);
console.log("Listening on", port);

