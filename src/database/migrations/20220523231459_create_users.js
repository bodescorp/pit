/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('user_cod');
        table.integer('chapa').primary();
        table.string('nome').notNullable();
        table.string('whatsApp').notNullable();
        table.string('email').notNullable();
        table.string('formacao').notNullable();
        table.string('password').notNullable();
        table.string('email_token');
        table.boolean('email_verificado');
        table.boolean('adm').defaultTo('false');


        table.integer('regime_id');
        table.integer('titulacao_id');


        table.foreign('regime_id').references('regime_trab_id').inTable('work_regime');
        table.foreign('titulacao_id').references('titulacao_id').inTable('titration');


    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users');

};
