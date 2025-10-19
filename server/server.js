const jsonServer = require("json-server");
const https = require("https");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 10000;

server.use(middlewares);
server.use(router);

// Keep-alive function
const keepAlive = () => {
  const urls = [
    "https://bot-battlr-backend-kwuq.onrender.com/bots",
    "https://bot-battlr-frontend-1zco.onrender.com",
  ];

  urls.forEach((url) => {
    https
      .get(url, (res) => {
        console.log(
          ` ${new Date().toLocaleTimeString()} - ${url} - Status: ${
            res.statusCode
          }`
        );
      })
      .on("error", (err) => {
        console.log(
          ` ${new Date().toLocaleTimeString()} - ${url} - Error: ${err.message}`
        );
      });
  });
};

// Ping every 10 minutes (Render sleeps after 15min inactivity)
setInterval(keepAlive, 10 * 60 * 1000);

// Start pinging 5 seconds after server starts
setTimeout(keepAlive, 5000);

server.listen(port, () => {
  console.log(` Bot Battlr Backend running on port ${port}`);
  console.log(` Keep-alive service activated`);
});
