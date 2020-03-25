
exports.up = function(knex) {
  //Cria a tabela no banco de dados
  //Parametros Nome da tabela, function
  return knex.schema.createTable('incidents', function(table) {
    //Cria chave primaria numerica de forma automatica
    //Sempre incrementando 1 conforme os cadastros
    table.increments()
    table.string('title').notNullable()//não permite que o campo seja nulo
    table.string('description').notNullable()//não permite que o campo seja nulo
    table.decimal('value').notNullable()//não permite que o campo seja nulo

    //Id da ongs que criou o incidente
    //Será usado para identificar o relacionamento
    //Por exemplo qual ong criou esse incidente especifico
    table.string('ong_id').notNullable()//não permite que o campo seja nulo

    //Definiando relacionamento entre o campo ong_id da tabela incidents
    //e o campo ID da tabela ongs
    //Definindo Chave Estrangeira
    table.foreign('ong_id').references('id').inTable('ongs')
  })
};

//Usado caso seja necessario voltar atrás e desfazer o que foi feito
exports.down = function(knex) {
  //Deleta a tabela ONGS
  return knex.schema.dropTable('incidents')
};
