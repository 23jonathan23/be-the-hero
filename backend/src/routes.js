//Importando o express
const express = require('express')

//Essa é uma biblioteca de validação
const { celebrate, Segments, Joi } = require('celebrate')

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
routes.post('/sessions',celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionController.create)

// //Function assincrona
// //Rota usada para listar ongs cadastradas
routes.get('/ongs', OngController.index)

//Function assincrona
//Rota usada para cadastrar ongs
//Usando a function ecapsulada no Controller
//Celebrate é usado para fazer a validação dos dados recebidos
//que foram mandados através do front-end
routes.post('/ongs', celebrate({
  //Segments: de onde está vindo esse dados? no caso no Body
  //Joi.object(): estamos dizendo que esperamos receber um object e nada alem disso
  //keys(): chaves desse object que serão validadas
  [Segments.BODY]: Joi.object().keys({
    //Joi.string(): dizemos que esse dado deve ser um string e nada alem disso
    //Joi.required(): dizemos que esse dado é obrigatório
    //Joi.email(): dizemos que esse dado é um email então sera aplicado a validação
    //verificando @ .com.br e etc
    ////Joi.number(): dizemos que esse dado deve ser um number e nada alem disso
    //max(): valor maximo
    //min(): valor maximo
    //length(): define o tamanho quantidades de caracteres que o dado possui
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create)

//Function assincrona
//Rota usada para cadastrar incidentes
//Usando a function ecapsulada no Controller
routes.post('/incidents',celebrate({

  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),

  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
}), IncidentsController.create)

//Function assincrona
//Rota usada para listar os incidentes cadastradas
routes.get('/incidents', celebrate({
  //Segments: de onde está vindo esse dados? no caso no QUERY //parametros na url dps do "?"
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentsController.index)
//Rota usada para deletar um incidente cadastradas
//Os incidentes são identificado pelo id
routes.delete('/incidents/:id', celebrate({
  //Segments: de onde está vindo esse dados? no caso no Params //parametros na url dps do "/"
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentsController.delete)

//Function assincrona
//Rota usada para listar os incidentes cadastradas
//Correspondente a ong que está logada
routes.get('/profile', celebrate({
//Segments: de onde está vindo esse dados? no caso no Headers
//Joi.object(): estamos dizendo que esperamos receber um object e nada alem disso
//No caso de dados que vem pelo Headers, não é necessario o uso de .keys()
[Segments.HEADERS]: Joi.object({
  authorization: Joi.string().required()
  }).unknown() //Basicamente diz que eu não sei todos os dados que virão na requisição, e ai com isso eles são ignorados
}), ProfileController.index)
module.exports = routes