const express = require('express');
const router = express.Router();
const activityService = require('./activity.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    activityService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {

    console.log(req.user.sub);
    activityService.getAll(req.user.sub)
        .then(activities => res.json(activities))
        .catch(err => next(err));
}

function getById(req, res, next) {
    console.log(req.params);
    console.log('tessss');
    activityService.getById(req.params.id)
        .then(activity => activity ? res.json(activity) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    activityService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    activityService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
