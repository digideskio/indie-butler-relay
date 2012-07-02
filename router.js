/*This is the master router*/
function router() {
  this._routes = {};
}

router.prototype.routeExists = function(domain) {
  return this._routes[domain];
}

router.prototype.route = function(domain, request, callback) {
  this._routes[domain].emit('get', request, function(response) {
  callback(response);
  });
}

router.prototype.register = function(domain, client) {
  this._routes[domain] = client;
}

router.prototype.unregister = function(domain, client) {
  delete this._routes[domain];
}

exports.router = router;
