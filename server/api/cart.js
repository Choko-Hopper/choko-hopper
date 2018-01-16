const router = require('express').Router()

router.get('/', (req, res, next) => {
  const { cart } = req.session
  res.json(cart)
})

router.get('/totals', (req, res, next) => {
  const { cart } = req.session
  const orderSubTotal = cart.length ?
    cart
    .map(cartItem => {
      return +cartItem.unitPrice * +cartItem.quantity
    })
    .reduce((a, b) => a + b)
  : 0
  const discount = req.session.promo
    ? orderSubTotal * (req.session.promo.percentOff / 100)
    : 0
  const orderTotal = orderSubTotal - discount
  res.send({ orderSubTotal, discount, orderTotal })
})

router.put('/update', (req, res, next) => {
  const { cart } = req.session
  const currentItemIndex = cart.findIndex(lineItem => {
    return lineItem.productId === req.body.productId
  })

  if (currentItemIndex > -1) cart[currentItemIndex] = req.body
  else cart.push(req.body)
  res.send(200)
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
