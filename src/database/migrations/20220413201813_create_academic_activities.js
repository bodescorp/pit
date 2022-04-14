/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('academic_activities', function (table) {
        
        table.increments();
        table.string('unidade_curricular').notNullable();
        table.tinyint('tempo_ensino').notNullable();
        table.tinyint('tempo_extra_classe').notNullable();        
        table.string('users_id').notNullable();

        table.foreign('users_id').references('id').inTable('users');
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('academic_activities');
};
