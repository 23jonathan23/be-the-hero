//Arquivo de conexão
//Importando o knex
const knex = require('knex')
//Importando arquivo de configuração do knex
const configuration = require('../../knexfile')

//Node_env é uma variavel ambiente
//as variaveis ambiente são acessadas através de process.env.
//verifica se a variavel é igual a teste, então isso significa que estamos no modo de teste
//se não setamos o modo desenvolvedor
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

//Definindo a conexão no modo desenvolvedor
const connection = knex(config)

module.exports = connection