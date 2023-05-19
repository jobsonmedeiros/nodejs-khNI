const knex = require("../dados/conexao");

// listagem de todas as categorias
const listarCategorias = {

  async listarCategorias (req, res) {

    const categorias = await knex
      .select('*')
      .table("categorias")
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((erro) => {
        return res.status(400).json(erro.message);
      });
  },
};

module.exports = listarCategorias;
