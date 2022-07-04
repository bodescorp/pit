       /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('activities_teaching', function (table) {

        table.increments('academica_id');
        table.string('unidade_curricular').notNullable();
        table.integer('ch_semanal').notNullable();

        table.integer('user_id').notNullable();
        table.integer('pit_id').notNullable();
        table.integer('curso_id');


        table.foreign('user_id').references('chapa').inTable('users');
        table.foreign('pit_id').references('pit_id').inTable('pits');
        table.foreign('curso_id').references('curso_id').inTable('corses');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('activities_teaching');
};
