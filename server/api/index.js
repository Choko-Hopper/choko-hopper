const router = require('express').Router()
const isAdmin = require('./isAdmin')
module.exports = router

<<<<<<< HEAD
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin || process.env.NODE_ENV === 'test') {
    next()
  } else {
    let error = new Error('Unauthorized Action')
    error.status = 403
    next(error)
  }
}

=======
>>>>>>> 8074983be4f4b90a601d3de52ae26ea485efd792
router.use('/users', isAdmin, require('./users'))
router.use('/products', require('./products'))
router.use('/orders', isAdmin, require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
