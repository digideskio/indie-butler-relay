var request = require('request');
var url = require('url');

app.get('/authed/:socket', function(req, res) {
  request({url: "http://indieauth.com/session?token=" + req.query.token,  json:true}, function (error, response, auth) {
    if (!error && response.statusCode == 200) {
      var socket = app.socketRouter.sockets[req.params.socket];
      if(auth.me && socket) {
        var parsed = url.parse(auth.me);
        socket.handler = parsed.hostname;
        app.socketRouter.register(parsed.hostname, socket);
        res.write("Awesome. You are now binded to " + parsed.hostname);
      }
      else {
        res.write("Nope. You are not binded to " + parsed.hostname);
      }
      res.end();
    }
    else {
      res.write("Nope. You are not binded");
      res.end();
    }
  });
});
