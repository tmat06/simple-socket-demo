const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");

var arrMessages = [];
const app = express();

app.use(bodyParser.json());

app.get("/api/get-messages", (req, res) => {
  res.status(200).send(arrMessages);
});

const io = socket(
  app.listen(3005, () => console.log("Magic happens on port: 3005"))
);
io.on("connection", socket => {
  console.log("connected");
  socket.on("hit-me", obj => {
    const { name, message } = obj;
    arrMessages.push({ name, message });
    io.sockets.emit("receive-me", arrMessages);
  });
});
