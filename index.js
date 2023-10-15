const express = require("express");
const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.send("hotstar backend");
});

app.get("");

app.listen(port, () => {
  console.log("server is listening on ", port);
});
