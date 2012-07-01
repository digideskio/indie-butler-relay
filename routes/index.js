/*
 * GET home page.
 */

/*Catch all*/
app.get('/:user/:path.:format', function(req, res){
  if(app.socketRouter.routeExists(req.params.user)) {
    app.socketRouter.route(req.params.user, req.params.path, req.params.format, function(data) {
      res.json(data);
    });
  }
  else {
    res.send('Not available :(', 503);
  }
});

