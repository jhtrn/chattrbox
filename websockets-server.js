var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic;
console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");

  if (topic) { //if topics is not empty
    var curTopic = "*** Topic is ";
    curTopic += "'" + topic + "'";
    socket.send(curTopic); //send current topic to new user first
  }

  messages.forEach(function(msg) { //allow new users to see prev msgs
    socket.send(msg);
  });

  socket.on("message", function(data) { //echo server: repeat messages sent
    console.log("message received: " + data);
    if (data.indexOf("/topic") != -1) { //if message is /topic command
      var changedTopic = "*** Topic has been changed to ";
      changedTopic += "'" + data.substring(7, data.length) + "'";
      topic = data.substring(7, data.length);
      ws.clients.forEach(function(clientSocket) { //send new msgs to all users
        clientSocket.send(changedTopic);
      });
    } else {
      messages.push(data); //keep log of messages
      ws.clients.forEach(function(clientSocket) { //send new msgs to all users
        clientSocket.send(data);
      });
    }

    // socket.send(data);
  });
});
