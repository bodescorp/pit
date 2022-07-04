/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pits', function (table) {
        table.increments('pit_id').primary();
        table.integer('semestre_id').notNullable();
        table.integer('user_id').notNullable();

        table.foreign('user_id').references('chapa').inTable('users');
        table.foreign('semestre_id').references('semestre_id').inTable('semester');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('pits');
  
};
