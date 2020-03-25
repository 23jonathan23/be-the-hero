//Importação da biblioteca Express
const express = require('express')

//Importando a biblioteca cors
const cors = require('cors') 
//Importando as rotas
const routes = require('./routes')

//Instanciando o express
const app = express()

//O cors é o responsavel por definir que podera acessar o app
//Ou seja que font-end podera fazer requisições a nossa API
app.use(cors())
//Converte todas as requisições JSON em objeto
app.use(express.json())
//Aplicado a qualquer requisição
app.use(routes)

//Banco de dados
//SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
//NoSQL: MongoDB, CouchDB, etc

//Driver: SELECT * FROM users
//Query Builder: table('users').select('*').where() //Usando KNEX

//Configurando a porta onde a aplicação será executada
app.listen(3333)