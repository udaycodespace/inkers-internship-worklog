const http = require("http");

http.createServer((req, res) => {
  res.write("Hello from Node App");
  res.end();
}).listen(3000);
