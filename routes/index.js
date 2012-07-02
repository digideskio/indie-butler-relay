/*
* GET home page.
*/

/*Catch all*/
app.get('/:user/:path', function(req, res){

  console.log("-------------------------BUTLER HOST----------------", req.header('host'));


  if(app.socketRouter.routeExists(req.params.user)) {
    app.socketRouter.route(req.params.user, {headers: req.headers, path: '/' + req.params.path}, function(data) {
      for(header in data.headers) {
        res.header(header, data.headers[header]);
      }
      if(data.body) {
        res.write(data.body);
      }
      res.end();
    });
  }
  else {
    res.send('Not available :(', 503);
  }
});

