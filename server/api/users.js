const router = require('express').Router()
const { User } = require('../db/models')
const isAdmin = require('./isAdmin')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    // attributes: ['id', 'email', ]
  })
    .then(users => res.json(users))
    .catch(next)
})


router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
})

router.put('/make-admin/:id', isAdmin, (req, res, next) => {
  User.findById(req.params.id)
  .then(user => user.update({isAdmin: true}))
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
})

router.put('/remove-admin/:id', isAdmin, (req, res, next) => {
  User.findById(req.params.id)
  .then(user => user.update({isAdmin: false}))
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(updatedUser => res.json(updatedUser))
    .catch(next)
})


router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})

