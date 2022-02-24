const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validProduct(product) {
  const hasName = typeof product.name == 'string' && product.name.trim() != '';
  const hasQuantity = !isNaN(product.quantity);
  const hasPrice = !isNaN(product.price);
  const hasDescription = typeof product.description == 'string' && product.description.trim() != '';
  return hasName && hasQuantity && hasPrice && hasDescription;
}

router.get('/', (req, res) => {
  queries.getAll().then(products => {
    res.json(products);
  });
});

router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(product => {
    if (product) {
      res.json(product);
    } else {
      next();
    }
  });
});

router.post('/add', (req, res, next) => {
  if (validProduct(req.body)) {
    queries.create(req.body).then(products => {
      res.json(products[0]);
    });
  } else {
    next(new Error('Invalid product'));
  }
});

router.put('/update/:id', isValidId, (req, res, next) => {
  if (validProduct(req.body)) {
    queries.update(req.params.id, req.body).then(products => {
      res.json(products[0]);
    });
  } else {
    next(new Error('Invalid product'));
  }
});

router.delete('/delete/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;