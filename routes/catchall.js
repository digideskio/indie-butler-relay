
/*Catch all*/
app.get('/*', function(req, res) {
  var p = '/'
  if (req.params[0]) {
    p += req.params[0]
  }
  var host = req.header('host').match(/butler\.(.*)/);
  if(host && host[1] && app.socketRouter.routeExists(host[1])) {
    app.socketRouter.route(host[1], {method: 'get', headers: req.headers, path: p}, function(response) {
      res.send(response.body, response.headers, response.status || 200)
    });
  }
  else {
    res.send('<h1>Not available</h1><p>The butler you\'re trying to reach is not connected at this time. Please try again later.</p>', 503);
  }
});
