const app = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: true,
  origins: ["*"],
});
const port = new SerialPort({ path: "COM6", baudRate: 9600 });
const parserP1 = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parserP1.on("data", (line) => {
  console.log(line);
  io.emit("lap", line);
});

httpServer.listen(3000, () => console.log("Server is running on port 3000"));
