require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to SMS Blast App");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
