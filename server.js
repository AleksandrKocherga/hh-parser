const app = require("./app.js");
const http = require("http");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`-------------Start Server on ${port}----------`);
});
