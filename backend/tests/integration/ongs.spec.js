//Teste Integration, são utilizados para testar seu aplicação como um todo
//Ou seja de ponta a ponta
//Utilizamos a biblioteca JEST que é responsavél por automatizar os teste

//Biblioteca responsavél por lidar com requisições http
//Ela é mais indica do que o axios para teste
//Importantante ele é usada para teste, não para produção ou desenvolvimento
//O axios é melhor para produção e desenvolvimento
const request = require('supertest')

//Importando o arquivo principal do app
const app = require('../../src/app')

//Importando o mudulo de conexão do database
const connection = require('../../src/database/connection')

//Parametros nome do teste, e function com o teste
describe('ONG', () => {

  //Antes de cada teste ele executa a function
  beforeEach(async () => {
    //desfaz todas as alterações das migrates anteriores
    await connection.migrate.rollback()
    //Executa as migrates
    await connection.migrate.latest()
  })

  //Depois de todos os teste ele executa a function
  afterAll(async () => {
    //Fecha a connection
    await connection.destroy()
  })

  //Novamente nome do teste, geramento o nome é o significado por trás do teste
  it('should be able to create a new ONG', async () => {

    //Parametro do resquest é o app
    //.post o metodo que queremos usar para requisição
    //.send: dados que serão enviados na requisição
    const response = await request(app)
          .post('/ongs')
          .send({
            name: 'APAE',
            email: 'contato@gmail.com',
            whatsapp:'55988177153',
            city: 'Alegrete',
            uf: 'RS'
          })
    
    //Expect: é o que eu estou recebendo
    //.tohaveLength/tohaveProperty : é o que eu espero receber
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})