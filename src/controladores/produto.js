const knex = require("../dados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const print = (a) => console.log(a);

const cadastrarProduto = async (req, res) => {
  try {
    print("Tentando registrar novo produto no sistema...");

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
/*
    -   Validar os campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id
    -   A categoria informada na qual o produto será vinculado deverá existir.
*/

    if (!descricao) {
      return res.status(400).json({ mensagem: "Favor corrigir campo não informado 'descricao'." });
    }
    if (!quantidade_estoque) {
      return res.status(400).json({ mensagem: "Favor corrigir campo não informado 'quantidade_estoque'." });
    }
    if (!valor) {
      return res.status(400).json({ mensagem: "Favor corrigir campo não informado 'valor'."});
    }
    if (!categoria_id) {
        return res.status(400).json({ mensagem: "Favor corrigir campo não informado 'categoria_id'." });
      }

    const constaCategoria_id = await knex("categoria").where("categoria_id", categoria_id);
      print(constaCategoria_id)
    

    // if (emailsRegistrados.length == 0) {
    //   const novoUsuario = await knex
    //     .insert({ nome, email, senha }, ["nome", "email"])
    //     .into("usuarios")
    //     .then((result) => {
    //       print("Produto registrado com sucesso!");
    //       return res.status(200).json(result[0]);
    //     })
    //     .catch((erro) => {
    //       print(erro);
    //       print("[1]Produto não pôde ser cadastrado.");
    //       return res
    //         .status(400)
    //         .json({ mensagem: "[2]Produto não pôde ser cadastrado." });
    //     });
    // } else {
    //   print("[1]Não foi possível efetuar o cadastro.");
    //   return res
    //     .status(400)
    //     .json({ mensagem: "Produto já consta na base de dados." });
    // }
  } catch (error) {
    print(error);
    return res.status(500).json({
      mensagem: "Erro interno no servidor. Produto não pôde ser cadastrado.",
    });
  }
};

module.exports = cadastrarProduto;