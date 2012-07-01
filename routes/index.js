/*
* GET home page.
*/

/*Catch all*/
app.get('/:user/:path.:format', function(req, res){
  if(app.socketRouter.routeExists(req.params.user)) {
    app.socketRouter.route(req.params.user, req.params.path, req.params.format, function(data) {
      switch (format){
        case 'json':
          res.json(data);
        break;
        case 'html':
          res.send(data);
          break;
      default :
          res.send('Not Good');
  }

});
  }
  else {
    res.send('Not available :(', 503);
  }
});

