const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');
const fixtures = require('./fixtures');

describe('CRUD Products', () => {
    before((done) => {
        knex.migrate.latest()
            .then(() => {
                return knex.seed.run();
            }).then(() => done());
    });

    it('Lists all Records', (done) => {
        request(app)
            .get('/api/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                expect(response.body).to.deep.equal(fixtures.products);
                done();
            });
    });

    it('Show one record by id', (done) => {
        request(app)
            .get('/api/products/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.products[0]);
                done();
            });
    });

    it('Creates a record', (done) => {
        request(app)
            .post('/api/products')
            .send(fixtures.product)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.product.id = response.body.id;
                expect(response.body).to.deep.equal(fixtures.product);
                done();
            });
    });

    it('Updates a record', (done) => {
        fixtures.product.rating = 5;
        request(app)
            .put('/api/products/10')
            .send(fixtures.product)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.product);
                done();
            });
    });

    it('Deletes a record', (done) => {
        request(app)
            .delete('/api/products/10')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal({
                    deleted: true
                });
                done();
            });
    });
});