const express = require('express');
const router = express.Router();
const clientService = require('./client.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    console.log(req.body);
    clientService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    clientService.getAll(req.user.sub)
        .then(clients => res.json(clients))
        .catch(err => next(err));
}

function getById(req, res, next) {
    clientService.getById(req.params.id)
        .then(activity => activity ? res.json(activity) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    clientService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    clientService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
