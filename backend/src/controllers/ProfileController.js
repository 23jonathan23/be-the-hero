//Importando modulo de conexão com o banco de dados
const connection = require('../database/connection')

module.exports = {
  //Function responsável por listar os incidentes especidfico de cada ong
  async index(req, res) {
    const ong_id = req.headers.authorization

    //Armazenando todas os incidentes cadastradas no banco na constante
    //Que corresponde ao id da ong logada
    //Parametro Tabela
    //Aguarda a resposta chegar
    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*')
    
      //Retorna uma resposta para o font-end
    //com a lista de incidentes
    return res.json(incidents)

  }
}