const app = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: true,
  origins: ["*"],
});

io.on("connection", (socket) => {
  socket.emit("hello", "world");
});

// io.emit("hello", "world");

httpServer.listen(3000, () => console.log("Server is running on port 3000"));