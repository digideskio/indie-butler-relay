/*
* GET home page.
*/

/*Catch all*/
app.get('/:path?', function(req, res){
  var host = req.header('host').match(/butler\.(.*)/);
  if(host && host[1] && app.socketRouter.routeExists(host[1])) {
    var p = '/'
    if (req.params.path) {
      p += req.params.path
    }
    app.socketRouter.route(host[1], {headers: req.headers, path: p}, function(data) {
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

