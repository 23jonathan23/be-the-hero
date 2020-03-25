//Importando modulo de conexão com o banco de dados
const connection = require('../database/connection')

module.exports = {
  //Function responsável por criar uma sessão de login
    async create(req, res) {
      const { id } = req.body

      const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first()

        //Verifca se a ong foi encontrada
        if(!ong) {
          //Retorna um status de erro ao front-end
          return res.status(400).json({ error: 'No ONG found with this ID' })
        }

      //Retorna um resposta com o nome da ong para o front-end
      return res.json(ong)

    }
  }