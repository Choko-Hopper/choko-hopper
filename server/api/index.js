const router = require('express').Router()
const isAdmin = require('./isAdmin')
module.exports = router

router.use('/users', isAdmin, require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))
router.use('/cart', require('./cart'))
router.use('/categories', require('./categories'))
router.use('/promo', require('./promoCode'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
