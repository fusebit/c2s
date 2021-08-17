const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const createError = require('http-errors')
const Joi = require('joi');

const catSchema = Joi.object().keys({
    name: Joi.string(),
    breed: Joi.string(),
    color: Joi.string(),
    tags: Joi.object().keys().pattern(/./, Joi.string()),
});

router.get('/', function(req, res) {
    const count = +(req.query.count || 5);
    const next = +(req.query.next || 0);
    delete req.query.count;
    delete req.query.next;
    return res.json(db.search(req.query, count, next));
});

router.get('/:id', function(req, res, next) {
    const cat = db.tryGet(req.params.id);
    return cat ? res.json(cat) : next(createError(404, 'Cat not found'));
});

router.delete('/:id', function(req, res, next) {
    return db.delete(req.params.id) ? res.status(204).send() : next(createError(404, 'Cat not found'));
});

router.post('/', function(req, res, next) {
    const result = catSchema.validate(req.body);
    if (result.error) {
        return next(createError(400, result.error.message));
    }
    return res.json(db.create(req.body));
});

module.exports = router;
