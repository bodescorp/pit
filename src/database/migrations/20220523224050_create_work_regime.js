/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('work_regime', function (table) {
        table.increments('regime_trab_id').primary();
        table.string('descricao').notNullable();
        table.integer('ch_semanal').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('work_regime');
};
