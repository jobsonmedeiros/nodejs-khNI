const express = require("express");
const { listarCategorias } = require("../controladores/categoria");
const {cadastrarUsuario, verMeuPerfil, editarPerfil} = require("../controladores/usuario");
const login = require("../controladores/login");
const verificarAutenticacao = require("../intermediarios/autenticador");
const cadastrarProduto = require("../controladores/produto");

const rotas = express.Router();

rotas.get('/', (req,res) => {return res.json({"mensagem":"Conexão estabelecida!"})});
  
// Essa é a rota que será chamada quando o usuário quiser listar todas as categorias cadastradas.
rotas.get('/categoria', listarCategorias);

// Essa é a rota que será utilizada para cadastrar um novo usuário no sistema.
rotas.post('/usuario', cadastrarUsuario);

// Essa é a rota que permite o usuário cadastrado realizar o login no sistema.
rotas.post('/login', login)

rotas.use(verificarAutenticacao)

// Essa é a rota que permite o usuário logado visualizar os dados do seu próprio perfil, 
// de acordo com a validação do token de autenticação.
rotas.get('/usuario', verMeuPerfil)

// Essa é a rota que permite o usuário logado atualizar informações de seu próprio cadastro, 
// de acordo com a validação do token de autenticação.
rotas.put('/usuario', editarPerfil)

//Essa é a rota que permite o usuário logado cadastrar um novo produto no sistema.
rotas.post('/produto', cadastrarProduto)



module.exports = rotas