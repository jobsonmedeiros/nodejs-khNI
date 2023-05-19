require('dotenv').config()
// importamos o servidor express
const express = require("express");
const rotas = require("./roteamento/rotas.js");



// o instanciamos na variável app
const app = express();

// vamos trabaalhar com requisições em formato JSON
app.use(express.json());

// importamos o arquivo de roteamento
app.use(rotas)
var port = process.env.PORT || 3001
// vamos escutar a porta 'port'
app.listen(port, () => {
  
  console.log(`App PDV rodando localmente na porta ${port}...`);
});
console.log(process.env.PORT)