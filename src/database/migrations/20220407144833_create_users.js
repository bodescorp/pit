/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('whatsApp').notNullable();
        table.string('email').notNullable();
        table.string('formacao').notNullable();
        table.string('titulacao').notNullable();
        table.tinyint('regime_trabalho').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema.dropTable('users');
};
