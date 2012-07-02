
// When a butler tries to connect
app.sock.sockets.on('connection', function (socket) {
  // If the butler can be registered
  socket.on('register', function (handler) {
    socket.handler = handler
    app.socketRouter.register(handler, socket);
  });

  // When the butler disconnets
  socket.on('disconnect', function () {
    app.socketRouter.unregister(socket.handler);
  });
});
