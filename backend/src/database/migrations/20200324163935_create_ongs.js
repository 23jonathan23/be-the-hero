
exports.up = function(knex) {
  //Cria a tabela no banco de dados
  //Parametros Nome da tabela, function
  return knex.schema.createTable('ongs', function(table) {
    //Criando coluna id do tipo string e definido ela como chave primaria
    table.string('id').primary()
    table.string('name').notNullable()//não permite que o campo seja nulo
    table.string('email').notNullable()//não permite que o campo seja nulo
    table.string('whatsapp').notNullable()//não permite que o campo seja nulo
    table.string('city').notNullable()//não permite que o campo seja nulo
    //Parametro do string nome do campo e quantidade de caracter
    table.string('uf', 2).notNullable()//não permite que o campo seja nulo
  })
};

//Usado caso seja necessario voltar atrás e desfazer o que foi feito
exports.down = function(knex) {
  //Deleta a tabela ONGS
  return knex.schema.dropTable('ongs')
};
