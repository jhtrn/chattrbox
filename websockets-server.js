var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");

  messages.forEach(function(msg) { //allow new users to see prev msgs
    socket.send(msg);
  });

  socket.on("message", function(data) { //echo server: repeat messages sent
    console.log("message received: " + data);
    messages.push(data); //keep log of messages
    ws.clients.forEach(function(clientSocket) { //send new msgs to all users
      clientSocket.send(data);
    });
    // socket.send(data);
  });
});
