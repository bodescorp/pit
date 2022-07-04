/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('activities_pit_extra', function (table) {
        table.increments('pit_extra_id');
        table.integer('extra_id');
                
        table.string('descricao');

        table.integer('user_id').notNullable();
        table.integer('pit_id').notNullable();

        table.foreign('extra_id').references('extra_id').inTable('activities_extra');
        table.foreign('user_id').references('chapa').inTable('users');
        table.foreign('pit_id').references('pit_id').inTable('pits');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('activities_pit_extra');

};
