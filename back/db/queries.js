const knex = require('./knex'); // the connection!

module.exports = {
    getAll() {
        return knex('product');
    },
    getOne(id) {
        return knex('product').where('id', id).first();
    },
    create(product) {
        return knex('product').insert(product, '*');
    },
    update(id, product) {
        return knex('product').where('id', id).update(product, '*');
    },
    delete(id) {
        return knex('product').where('id', id).del();
    }
}