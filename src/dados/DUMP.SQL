
// executar esse arquivo com o comando:
// node ./src/dados/DUMP.SQL

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
-- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id integer NOT NULL DEFAULT nextval('usuarios_id_seq'::regclass),
    nome text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    senha text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usuarios_pkey PRIMARY KEY (id),
    CONSTRAINT usuarios_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;

// criação da tabela 'categorias'
-- Table: public.categorias

-- DROP TABLE IF EXISTS public.categorias;

CREATE TABLE IF NOT EXISTS public.categorias
(
    id integer NOT NULL DEFAULT nextval('categorias_id_seq'::regclass),
    descricao text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categorias_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categorias
    OWNER to postgres;

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

/*

-- Table: public.produtos

-- DROP TABLE IF EXISTS public.produtos;

CREATE TABLE IF NOT EXISTS public.produtos
(
    id integer NOT NULL DEFAULT nextval('produtos_id_seq'::regclass),
    descricao text COLLATE pg_catalog."default" NOT NULL,
    quantidade_estoque integer NOT NULL,
    valor integer NOT NULL,
    categoria_id integer NOT NULL,
    CONSTRAINT produtos_pkey PRIMARY KEY (id),
    CONSTRAINT produtos_categoria_id_fkey FOREIGN KEY (categoria_id)
        REFERENCES public.categorias (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.produtos
    OWNER to postgres;


-- Table: public.clientes

-- DROP TABLE IF EXISTS public.clientes;

CREATE TABLE IF NOT EXISTS public.clientes
(
    id integer NOT NULL DEFAULT nextval('clientes_id_seq'::regclass),
    nome text COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    cpf character varying(11) COLLATE pg_catalog."default" NOT NULL,
    cep character varying(8) COLLATE pg_catalog."default",
    rua text COLLATE pg_catalog."default",
    numero integer,
    bairro text COLLATE pg_catalog."default",
    cidade text COLLATE pg_catalog."default",
    estado character varying(2) COLLATE pg_catalog."default",
    CONSTRAINT clientes_pkey PRIMARY KEY (id),
    CONSTRAINT clientes_cpf_key UNIQUE (cpf),
    CONSTRAINT clientes_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.clientes
    OWNER to postgres;

*/
