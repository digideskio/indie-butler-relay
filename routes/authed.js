var http = require('http');

app.get('/authed/:socket', function(req, res) {
  http.get("http://indieauth.com/session?token=" + req.query.token, function (resp) {
    var body = "";
    resp.on('data', function (chunk) {
      body += chunk
    });
    resp.on('end', function() {
      auth = JSON.parse(body)
      var socket = app.socketRouter.sockets[req.params.socket];
      if(auth.me && socket) {
        socket.handler = auth.me
        app.socketRouter.register(auth.me, socket);
        res.write("Awesome. You are now binded to " + auth.me);
      }
      else {
        res.write("Nope. You are not binded to " + auth.me);
      }
      res.end();
    });
  }).on('error', function(e) {
    res.write("Nope. You are not binded to " + auth.me);
    res.end();
  });
});
