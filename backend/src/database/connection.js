//Arquivo de conexão
//Importando o knex
const knex = require('knex')
//Importando arquivo de configuração do knex
const configuration = require('../../knexfile')
//Definindo a conexão no modo desenvolvedor
const connection = knex(configuration.development)

module.exports = connection