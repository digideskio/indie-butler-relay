/*This is the master router*/
function router() {
  this._routes = {};
}

router.prototype.routeExists = function(user) {
  return this._routes[user];
}

router.prototype.route = function(user, path, callback) {
  this._routes[user].emit(path, function(response) {
  console.log("Response", response);
  callback(response);
  });
}

router.prototype.register = function(user, client) {
  this._routes[user] = client;
}

exports.router = router;
