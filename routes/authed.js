var http = require('http');

app.get('/authed/:socket', function(req, res){
        console.error("alpha");
        console.info("alpha");
        console.log("alpha");

  http.get("http://indieauth.com/session?token=" + req.query.token, function (resp) {
      console.error("0");
    var body = "";
    resp.on('data', function (chunk) {
      body += chunk
    });
    resp.on('end', function() {
      console.error("1");
      auth = JSON.parse(body)
      var socket = app.socketRouter.sockets[req.params.socket];
      if(auth.me && socket) {
        console.error("2");
        socket.handler = auth.me
        app.socketRouter.register(auth.me, socket);
        res.write("Awesome. You are now binded to " + auth.me);
      }
      else {
              console.error("3");
        res.write("Nope. You are not binded to " + auth.me);
      }
      res.end();
    });
  }).on('error', function(e) {
  console.log("Got error: " + e.message);
});


});
