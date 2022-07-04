/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('activities_extra', function (table) {
        table.increments('extra_id');
        table.string('descricao').notNullable();
        table.float('ch_semanal').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('activities_extra');
  
};
