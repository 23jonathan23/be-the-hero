//Importação da biblioteca Express
const express = require('express')

//Biblioteca usada para lidar com validação de dados
const { errors } = require('celebrate')

//Importando a biblioteca cors
const cors = require('cors') 
//Importando as rotas
const routes = require('./routes')

//Instanciando o express
const app = express()

//O cors é o responsavel por definir quem podera acessar o app
//Ou seja que font-end podera fazer requisições a nossa API
app.use(cors())
//Converte todas as requisições JSON em objeto
app.use(express.json())
//Aplicado a qualquer requisição
app.use(routes)

//Tranforma as mensagem de erros de validação em um objeto
//pois assim podemos utilizar no front-end
app.use(errors())

//Banco de dados
//SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
//NoSQL: MongoDB, CouchDB, etc

//Driver: SELECT * FROM users
//Query Builder: table('users').select('*').where() //Usando KNEX

//Exportando o express
module.exports = app