//Teste unitario, são utilizados para testar function especificas de um app
//Ou seja metodos isolados
//Utilizamos a biblioteca JEST que é responsavél por automatizar os teste

//Importando o modulo que vamos aplicar o teste
const generateUniqueId = require('../../src/utils/generateUniqueId')

//Parametros nome do teste, e function com o teste
describe('Generate Unique ID', () => {
  //Novamente nome do teste, geramento o nome é o significado por trás do teste
  it('should generate an unique ID', () => {

    const id = generateUniqueId()
    //Testa se o resultado do id pussui 8 caracteres
    //Expect: é o que eu estou recebendo
    //.tohaveLength : é o que eu espero receber
    expect(id).toHaveLength(8)
  })
})