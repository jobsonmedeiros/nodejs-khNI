const knex = require("../dados/conexao");
const bcryp = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJWT = require("../senhaJWT");
const print = (a) => console.log(a);

const login = async (req, res) => {

  try {
    print("Tentando efetuar login...");

    const { email, senha } = req.body;

    if (!email) {
      return res.status(400).json({ mensagem: "Campo 'email' não informado." });
    }
    if (!senha) {
      return res.status(400).json({ mensagem: "Campo 'senha' não informado." });
    }

    const registradoNoBanco = await knex("usuarios").where({ email }, email);
    const senhaCorreta = await bcryp.compare(senha, registradoNoBanco[0].senha);

    if (registradoNoBanco && senhaCorreta) {

      const token = jwt.sign({ id: registradoNoBanco[0].id }, senhaJWT, {
        expiresIn: "6h",
      });

      const { senha: senhaUsuario, ...usuarioLogado } = registradoNoBanco[0];

      print("Login efetuado com sucesso!");

      return res.status(200).json({ usuario: usuarioLogado, token });
    } else {
      print("Não foi possível efetuar login. Senha e/ou e-mail inválido(s)!");
      return res.status(400).json({
        mensagem:
          "Não foi possível efetuar login. Senha e/ou e-mail inválido(s)!",
      });
    }

  } catch (error) {
    print(error);
    return res.status(500).json({
      mensagem: "Erro interno no servidor. Usuário não pôde efetuar login.",
    });
  }
};

module.exports = login;
