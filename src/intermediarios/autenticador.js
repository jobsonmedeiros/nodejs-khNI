const jwt = require("jsonwebtoken");
const senhaJWT = require("../senhaJWT");
const knex = require("../dados/conexao");
const print = (a) => console.log(a);

const verificarAutenticacao = async (req, res, next) => {
  const { authorization } = req.headers;

  print("Tentando autenticar usuário...");

  if (!authorization) {
    print("Usuário não autenticado. Acesso negado!");
    return res
      .status(401)
      .json({ mensagem: "Usuário não autenticado. Acesso negado!" });
  }

  const token = authorization.split(" ")[1];
  try {
    // se o token for válido retornará o payload com o id do usuário
    const { id } = jwt.verify(token, senhaJWT);

    const usuarioExiste = await knex("usuarios").where({ id }, id);

    if (!usuarioExiste) {
      return res
        .status(401)
        .json({ mensagem: "Usuário não autenticado. Acesso negado!" });
    }

    const { senha, ...usuario } = usuarioExiste[0];

    req.usuario = usuario;
    print("Usuário autenticado!");

    next();
  } catch (error) {
    return res.json(error.message)
      // .status(401)
      // .json({ mensagem: "Erro interno no servidor." });
  }
};

module.exports = verificarAutenticacao;
