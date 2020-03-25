//Importando modulo de conexão com o banco de dados
const connection = require('../database/connection')

module.exports = {
//Function responsável por listar os incidentes cadastradas
  async index(req, res) {
    //Usado para identificar a pagina da lista de incidentes que o
    //usuario está
    //Vamos retornar somente 5 registros por pagina
    const {page = 1} = req.query

    //Retorna a quantidade de incidentes cadastrados no banco de dados
    const [count] = await connection('incidents').count()

    //Armazenando todas os incidentes cadastradas no banco na constante
    //Parametro Tabela
    //Aguarda a resposta chegar
    const incidents = await connection('incidents')
    //O join é usado para traser dados da ong que está na tabela ongs
    //Deve existir um relacionamento entre as tabelas
    //Parametros: tabela, campo da tabela, operador, campo da tabela origem
    //Está comparando se id sem iguais
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5) //limita a quantidade de resgistro que será retornados
    //Pula de 5 em 5
    //Pula os registro conforme a pagina que o usuario listar
    .offset((page -1) * 5) 
    //Selecionando todos os campos da tabela incidentes
    //E selecioando alguns campos da tabela ongs
    .select('incidents.*', 
    'ongs.name', 
    'ongs.email', 
    'ongs.whatsapp', 
    'ongs.city',
    'ongs.uf')

    //Envia uma resposta ao front-end pelo Header da resposta
    //o total de incideste cadastrados
    //Geralmente o nome que se da quando retorna a quantidade
    //a lsita possui de respostas é esse X-Total-Count
    res.header('X-Total-Count', count['count(*)'])

    //Retorna uma resposta para o font-end
    //com a lista de incidentes
    return res.json(incidents)
  },

  //Function responsavel por cadastrar incidestes
  async create(req, res) {
    //Armazenando os dados que vieram no corpo da requisição
    const {title, description, value} = req.body
    //Identificando qual ong está logada, e cadastrará o incidente
    //Geralmente o login vem no headers, ou seja a autenticação
    //Quem está logado 
    const ong_id = req.headers.authorization

    //Aguarda a function terminar a inserção para executar a proxima linha
    //Ao termino e retornado uma resposta e estamos pegando o ID
    const [id] = await connection('incidents').insert({
      //Passando quais campos irá ser inserido os dados
      //Passando os dados 
      title,
      description,
      value,
      ong_id
    })

    //Retorna uma resposta para o font-end
    return res.json({ id })
  },

  async delete(req, res) {
    //Armazenando o id do incidente que será deletado
    const { id } = req.params
    //Identificando qual ong está logada, e deletara o incidente
    //Geralmente o login vem no headers, ou seja a autenticação
    //Quem está logado 
    const ong_id = req.headers.authorization

    //Selecionando o incidente que corresponde ao id passado
    //e pegando o valor do ong_id que cadrastrou o incidente
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    //Verifica se o ong_id da ong logada corresponde ao ong_id do
    //Incidentes que será deletado
    if(incident.ong_id !== ong_id) {
      //Retorna um erro de não autorizado para o front-end
      return res.status(401).json({ error: 'Operation not permitted.' })
    }

    //Deleta o incidente onde o id corresponde
    await connection('incidents').where('id', id).delete()

    //Retorna um resposta sem conteudo para o front-end
    return res.status(204).send()
  }
}