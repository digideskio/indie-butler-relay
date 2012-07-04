
// When a butler tries to connect
app.sock.sockets.on('connection', function (socket) {
  app.socketRouter.add(socket);
  socket.emit('session', socket.id);
  // When the butler disconnets
  socket.on('disconnect', function () {
    app.socketRouter.remove(socket);
    app.socketRouter.unregister(socket.handler);
  });
});
