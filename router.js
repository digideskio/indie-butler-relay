/*This is the master router. In memory! */
function router() {
  this.sockets = {};
  this._routes = {};
}

// Checks whether a route exists.
router.prototype.routeExists = function(domain) {
  return this._routes[domain];
}

// Sends a request down to a butler
router.prototype.route = function(domain, request, callback) {
  this._routes[domain].emit('get', request, function(response) {
  callback(response);
  });
}

// Registers a route.
router.prototype.register = function(domain, client) {
  this._routes[domain] = client;
}

// Unregsiters a route (user went offline)
router.prototype.unregister = function(domain, client) {
  delete this._routes[domain];
}

// Add a socket.
router.prototype.add = function(client) {
  this.sockets[client.id] = client;
}

// remove a socket.
router.prototype.remove = function(client) {
    delete this.sockets[client.id];
}




exports.router = router;
