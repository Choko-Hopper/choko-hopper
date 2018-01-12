const router = require('express').Router()

router.put('/update', (req, res, next) => {
  const { cart } = req.session
  const currentItemIndex = cart.findIndex(lineItem => {
    return lineItem.productId === req.body.productId
  })

  if (currentItemIndex > -1 ) cart[currentItemIndex] = req.body
  else cart.push(req.body)
    res.send(200)
    console.log('NEW CART', cart)
})

router.put('/delete', (req, res, next) => {
  const { cart } = req.session
  const currentItemIndex = cart.findIndex(lineItem => {
    return lineItem.productId === req.body.productId
  })

})

module.exports = router
