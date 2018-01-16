const router = require('express').Router()
const { PromoCode } = require('../db/models')
const isAdmin = require('./isAdmin')
module.exports = router

// Admin Can Get A List Of All Promo Codes
router.get('/', isAdmin, (req, res, next) => {
  PromoCode.findAll()
    .then(promoCodes => res.json(promoCodes))
    .catch(next)
})

// User Can Validate A Code At Checkout
router.get('/:code', (req, res, next) => {
  const { code } = req.params
  PromoCode.findOne({ where: { code } })
    .then(promo => {
      if (!promo) {
        req.session.promo = null
        let err = new Error('Promo Code not found')
        err.status = 404
        throw err
      } else if (promo.expiration > new Date(Date.now())) {
        req.session.promo = null
        let err = new Error('Promo Code expired')
        err.status = 410
        throw err
      } else {
        req.session.promo = promo
        res.sendStatus(202)
      }
    })
    .catch(next)
})

// Admin Can Create New Code
router.post('/', isAdmin, (req, res, next) => {
  PromoCode.create(req.body)
    .then(promo => res.status(201).json(promo))
    .catch(next)
})

// Admin Can Update Code
router.put('/:id', isAdmin, (req, res, next) => {
  PromoCode.findById(req.params.id)
    .then(promo => promo.update(req.body))
    .then(updatedPromo => res.json(updatedPromo))
    .catch(next)
})

// Admin Can Delete Code
router.delete(':id', isAdmin, (req, res, next) => {
  PromoCode.findById(req.params.id)
    .then(promo => promo.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})
