exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (user) => {
     user.increments('id').unique()
     user.string('password')
     user.string('name_full')
     user.string('email').unique()
     user.string('org_name')
     user.integer('current_year_tax')
     user.integer('current_year_energy_cost')
     user.integer('roof_square_footage')
     user.integer('projected_energy_annual_kW')
     user.boolean('match_program')
     user.boolean('match_alerts')
  })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('users') 
};
