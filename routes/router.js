/*This is the master router*/
function router() {
  this._routes = {};
}

router.prototype.route = function(user) {
  return this._routes[user];
}

router.prototype.register = function(user, client) {
  this._routes[user] = client;
}

exports.router = router;
