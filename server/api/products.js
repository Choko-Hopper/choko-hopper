const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

function isAdmin(req, res, next){
    if (req.user && req.user.isAdmin){
        next()
    } else {
        const err = new Error('Not authorized')
        err.status = 403
        next(err)
    }
}

router.get('/', (req, res, next) => {
    Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next)
})

router.post('/', isAdmin, (req, res, next) => {
    Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next)
})

router.put('/:id', isAdmin, (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next)
})

router.delete('/:id', isAdmin, (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})