const knex = require("../dados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const print = (a) => console.log(a);
// listagem de todas as categorias
const cadastrarUsuario = async (req, res) => {
  try {
    print("Tentando registrar novo usuário...");

    const { nome, email } = req.body;
    var { senha } = req.body;

    if (!nome) {
      return res.status(400).json({ mensagem: "Campo 'nome' não informado." });
    }
    if (!email) {
      return res.status(400).json({ mensagem: "Campo 'email' não informado." });
    }
    if (!senha) {
      return res.status(400).json({ mensagem: "Campo 'senha' não informado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    senha = senhaCriptografada;

    const emailsRegistrados = await knex("usuarios").where("email", email);

    if (emailsRegistrados.length == 0) {
      const novoUsuario = await knex
        .insert({ nome, email, senha }, ["nome", "email"])
        .into("usuarios")
        .then((result) => {
          print("Usuário registrado com sucesso!");
          return res.status(200).json(result[0]);
        })
        .catch((erro) => {
          print(erro);
          print("[1]Usuário não pôde ser cadastrado.");
          return res
            .status(400)
            .json({ mensagem: "[2]Usuário não pôde ser cadastrado." });
        });
    } else {
      print("[1]Não foi possível efetuar o cadastro.");
      return res
        .status(400)
        .json({ mensagem: "Usuário já consta na base de dados." });
    }
  } catch (error) {
    print(error);
    return res.status(500).json({
      mensagem: "Erro interno no servidor. Usuário não pôde ser cadastrado.",
    });
  }
};

const verMeuPerfil = async (req, res) => {
  try {
    return res.json(req.usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarPerfil = async (req, res) => {
  print("Tentando editar perfil...");
  const { nome, email, senha } = req.body;

  try {
    const emailExiste = await knex("usuarios").where({ email }).first();

    if (emailExiste) {
      print("Erro: Email já consta na base de dados.")
      return res.status(400).json({
        mensagem: "Erro: Email já consta na base de dados.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const atualizarUsuario = await knex("usuarios")
      .where({ id: req.usuario.id })
      .update({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning("*");
    const { senha: _, ...usuario } = atualizarUsuario[0];

    print("Perfil editado com sucesso!");
    return res.status(201).json(usuario);

  } catch (error) {
    print(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = { cadastrarUsuario, verMeuPerfil, editarPerfil, editarPerfil };
