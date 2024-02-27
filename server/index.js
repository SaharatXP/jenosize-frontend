// server/index.js

const express = require("express");
const app = express();

// Parse JSON bodies for this app. Make sure you put it above any routes.
app.use(express.json());

// Example of a simple GET API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Nuxt API!" });
}); 

// Example of a POST endpoint
app.post("/api/data", (req, res) => {
  // Handle your POST request data here.
  console.log(req.body);
  res.json({ message: "Data received" });
});

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app,
};
