const crypto = require('crypto')

module.exports = function genereteUniqueId() {
  //Gerando um id para cada cadastro de ongs
  //RandomBytes, parametro quanto bytes
  //convertendo para string do tipo Hexadecimal
  return crypto.randomBytes(4).toString('HEX')
}