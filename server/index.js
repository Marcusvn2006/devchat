// const { off } = require("process");

const app = require("express")(); // Criação de uma instância do Express
const server = require("http").createServer(app); // Criação do servidor HTTP usando o Express
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:5173" },
});

const port = 3003;

io.on("connection", (socket) => {
  socket.on("set_username", (username) => {
    socket.data.username = username;
 
    console.log(`Bem-vindo ${username} seu id é ${socket.id}!`);
  });
  socket.on("messagem", (text) => {
    io.emit("receive_menssagem", {
      text,
      authorID: socket.id,
      author: socket.data.username,
    });
    console.log(`usuario ${socket.data.username} enviou a mensagem`);
  });
  socket.on("disconnect", (reson) => {
    console.log(`${socket.data.username} desconectado, motivo: ${reson}`);
  });
});

server.listen(port, () => {
  console.log("Server running...");
});
