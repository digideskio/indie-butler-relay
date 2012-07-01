/*This is the master router*/
function router() {
  this._routes = {};
}

router.prototype.routeExists = function(user) {
  return this._routes[user];
}

router.prototype.route = function(user, path, format, callback) {
  this._routes[user].emit(path, format, function(response) {
  callback(response);
  });
}

router.prototype.register = function(user, client) {
  this._routes[user] = client;
}

router.prototype.unregister = function(user, client) {
  delete this._routes[user];
}

exports.router = router;
