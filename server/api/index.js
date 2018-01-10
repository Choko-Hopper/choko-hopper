const router = require('express').Router()
module.exports = router

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    let error = new Error('Unauthorized Action')
    error.status = 403
    next(error)
  }
}

router.use('/users', isAdmin, require('./users'))
router.use('/products', require('./products'))
router.use('/orders', isAdmin, require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
