//Bibliote responsavél por gerir as requisições http
//Client Http
import axios from 'axios'

const api = axios.create({
  //Importante, como é um app mobile não podemos usar o localhost
  //pois ele aponta para o proprio celular, nesse caso devemos usar
  //o ip da maquina servidor, aconpanhado da porta.
  baseURL: 'http://192.168.1.104:3333'
})

export default api