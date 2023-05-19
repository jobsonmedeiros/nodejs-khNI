
// executar esse arquivo com o comando:
// node ./src/banco-de-dados-scripts/DUMP.SQL

const bancoDeDados = require("./conexao.js");

/*

-- Database: pdv
DROP DATABASE IF EXISTS pdv;

// A criação das tabelas e campos não será feita por migrations, será manualmente
// executando o script diretamente no HeidiSQL
CREATE DATABASE pdv
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE pdv
    IS 'Banco de dados para o Sistema Ponto de Venda (PDV)';

// criação da tabela 'usuarios'
create table usuarios (
    id serial primary key not null,
  	nome text not null,
    email text not null unique not null,
    senha text not null
);

// criação da tabela 'categorias'
create table categorias (
  id serial primary key not null,
  descricao text not null
);

*/

// Dados do user administrador
const dadosAdmin = {
  "nome": "Admin",
  "email": "admin@email.com",
  "senha": "12345",
};

// Inserção de dados do admin na base de dados
bancoDeDados
  .insert(dadosAdmin)
  .into("usuarios")
  .then((data) => {})
  .catch((err) => {console.log(err);
  });

// Categorias a serem pré-inseridas na base de dados
const categoriasAAdicionar = [
  {"descricao":"Informática"},
  {"descricao":"Celulares"},
  {"descricao":"Beleza e Perfumaria"},
  {"descricao":"Mercado"},
  {"descricao":"Livros e Papelaria"},
  {"descricao":"Brinquedos"},
  {"descricao":"Moda"},
  {"descricao":"Bebê"},
  {"descricao":"Games"},
]

// 
bancoDeDados.insert(categoriasAAdicionar)
.into("categorias")
.then((data) => {})
.catch((err) => console.log(err))
