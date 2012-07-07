
/*Catch all*/
app.get('/*', function(req, res) {
  var p = '/'
  if (req.params[0]) {
    p += req.params[0]
  }
  var host = req.header('host').match(/butler\.(.*)/);
  if(host && host[1] && app.socketRouter.routeExists(host[1])) {
    app.socketRouter.route(host[1], {method: 'get', headers: req.headers, path: p}, function(data) {
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
    res.send('<h1>Not available</h1><p>The butler you\'re trying to reach is not connected at this time. Please try again later.</p>', 503);
  }
});
