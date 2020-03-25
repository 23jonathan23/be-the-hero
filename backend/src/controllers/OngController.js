//Importando o arquivo de conexão com o banco de dados
const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
 //Function responsável por listar ongs cadastradas
  async index (req, res) {
    //Armazenado todas ongs cadastradas no banco na constante
    //Parametro Tabela
    //Aguarda a resposta chegar
    const ongs = await connection('ongs').select('*')
  
    //Retorna uma resposta para o font-end
    //com a lista de ongs
    return res.json(ongs)
  },

  //Function responsavel por cadastrar as ongs
  async create(req, res) {
    //Armazenando os dados que vieram no corpo da requisição
  const {name, email, whatsapp, city, uf} = req.body
  //Gerando um id para cada cadastro de ongs
  //RandomBytes, parametro quanto bytes
  //convertendo para string do tipo Hexadecimal
  const id = crypto.randomBytes(4).toString('HEX')
  //Inserindo dados na tabela ONGS
  //Parametro nome da tabela
  //Aguarda a function terminar a inserção para executar a proxima linha
  await connection('ongs').insert({
    //Passando quais campos irá ser inserido os dados
    //Passando os dados
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  })

  //Retorna uma resposta para o font-end
  return res.json({ id })
  }
}