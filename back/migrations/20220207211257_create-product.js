/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('product', (table) => {
        table.increments('id');
        table.text('name').notNullable();
        table.integer('quantity').notNullable();
        table.decimal('price').notNullable();
        table.text('description').notNullable();
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('product')

};
