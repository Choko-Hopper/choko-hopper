const router = require('express').Router()

router.put('/add', (req, res, next) => {
  const { cart } = req.session
  
    cart[req.body.productId] = req.body
    res.send(200)
    console.log('NEW CART', cart)
  })

module.exports = router
