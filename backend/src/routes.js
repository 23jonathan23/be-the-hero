//Importando o express
const express = require('express')

//Importando o controler
const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

//Instanciando function de rotas do express
const routes = express.Router()

//Métodos HTTP:
//GET: Buscar/Listar um informação do back-end
//POST: Criar uma informação no back-end
//PUT: Alterar um informação no back-end
//DELETE: Deletar uma informação no back-end

//Tipos de parametros
//Query Params: Parametros nomeados enviados na rota após "?" (Filtros, paginação)
//Route Params: Parâmetros utilizados para identificar recursos
//Request Body: Corpo da requisição, utilizado para criar ou alterar recursos

//configurando requisição do tipo X na rota principal
//.get('/Rota/Recurso'

// //Function assincrona
// //Rota usada para verificar o login ongs
routes.post('/sessions', SessionController.create)

// //Function assincrona
// //Rota usada para listar ongs cadastradas
routes.get('/ongs', OngController.index)

//Function assincrona
//Rota usada para cadastrar ongs
//Usando a function ecapsulada no Controller
routes.post('/ongs', OngController.create)

//Function assincrona
//Rota usada para cadastrar incidentes
//Usando a function ecapsulada no Controller
routes.post('/incidents', IncidentsController.create)

//Function assincrona
//Rota usada para listar os incidentes cadastradas
routes.get('/incidents', IncidentsController.index)
//Rota usada para deletar um incidente cadastradas
//Os incidentes são identificado pelo id
routes.delete('/incidents/:id', IncidentsController.delete)

//Function assincrona
//Rota usada para listar os incidentes cadastradas
//Correspondente a ong que está logada
routes.get('/profile', ProfileController.index)
module.exports = routes