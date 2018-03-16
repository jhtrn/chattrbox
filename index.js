var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var error = "app/error.html";

var handleError = function (err, res) {
  fs.readFile(error, function(err,data) {
    res.writeHead(400, {"Content-Type": "text/html"});
    res.write(data);
    res.end();
  });
};

var server = http.createServer(function (req, res) {
  console.log("Responding to a request.");

  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
  });
});
server.listen(3000);
