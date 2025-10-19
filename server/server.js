const jsonServer = require("json-server");
const https = require("https");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 10000;

server.use(middlewares);
server.use(router);

// Self-pinging function
function keepAlive() {
  const backendUrl = "https://bot-battlr-backend-kwuq.onrender.com/bots";
  const frontendUrl = "https://bot-battlr-frontend-1zco.onrender.com";

  console.log(" Pinging services to prevent sleep...");

  // Ping backend
  https
    .get(backendUrl, (res) => {
      console.log(`Backend pinged - Status: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.log("Backend ping failed:", err.message);
    });

  // Ping frontend
  https
    .get(frontendUrl, (res) => {
      console.log(`Frontend pinged - Status: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.log(" Frontend ping failed:", err.message);
    });
}

// Ping every 10 minutes (Render free tier sleeps after 15min inactivity)
setInterval(keepAlive, 10 * 60 * 1000);

// Initial ping when server starts
setTimeout(keepAlive, 5000);

server.listen(port, () => {
  console.log(` JSON Server is running on port ${port}`);
  console.log(` Backend URL: https://bot-battlr-backend-kwuq.onrender.com`);
});
