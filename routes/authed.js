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
        if(req.query.human) {
          res.send('Successfully connected as ' +  parsed.hostname, {}, 201);
        }
        else {
          res.send({bound: true, domain: parsed.hostname}, {'Content-Type': 'application/json'}, 201);
        }
      }
      else {
        if(req.query.human) {
          res.send('It looks like you do not own ' +  parsed.hostname, {}, 403);
        }
        else {
          res.send({bound: false, domain: parsed.hostname}, {'Content-Type': 'application/json'}, 403);
        }
      }
    }
    else {
      if(req.query.human) {
        res.send('We couldn\'t check that you own ' +  parsed.hostname, {}, 500);
      }
      else {
        res.send({bound: false, domain: parsed.hostname}, {'Content-Type': 'application/json'}, 500);
      }
    }
  });
});
