const router = require('express').Router()
const { Category } = require('../db/models')
const isAdmin = require('./isAdmin')
module.exports = router

router.get('/', (req, res, next) => {
    Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(next)
})

router.post('/', isAdmin, (req, res, next) => {
    Category.create(req.body)
    .then(category => res.status(201).json(category))
    .catch(next)
})

router.put('/:id', isAdmin, (req, res, next) => {
    Category.findById(req.params.id)
    .then(category => category.update(req.body))
    .then(updatedCategory => res.json(updatedCategory))
    .catch(next)
})

router.delete('/:id', isAdmin, (req, res, next) => {
    Category.findById(req.params.id)
    .then(category => category.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})
