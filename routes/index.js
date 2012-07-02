/*
* GET home page.
*/

/*Catch all*/
app.get('/:user/:path.:format', function(req, res){
  if(app.socketRouter.routeExists(req.params.user)) {
    app.socketRouter.route(req.params.user, req.params.path, req.params.format, function(data) {
      if(data.headers) {
        for(header in data.headers) {
          res.header(header , data.headers[header]);
        }
      }
      res.write(data.body);
      res.end();
    });
  }
  else {
    res.send('Not available :(', 503);
  }
});

