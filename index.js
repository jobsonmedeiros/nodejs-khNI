/*
const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('App PDV no ar!');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
*/

require("dotenv").config();
const express = require("express");
const rotas = require("./rotas");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotas);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `Servidor inciado na porta ${process
      .env
      .SERVER_PORT}: http://localhost:${process.env.SERVER_PORT}`
  );
});
