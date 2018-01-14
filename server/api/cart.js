const router = require('express').Router()

router.get('/', (req, res, next) => {
  const { cart } = req.session
  res.json(cart)
})

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
  let newCart = req.session.cart.filter(lineItem => {
    return +lineItem.productId !== +req.body.productId
  })
  req.session.cart = newCart
  res.send(200)
})

router.delete('/', (req, res, next) => {
  req.session.cart = []
  res.sendStatus(204)
})

module.exports = router
