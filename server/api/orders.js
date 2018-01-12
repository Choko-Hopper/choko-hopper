const router = require('express').Router()
const { Order, LineItems } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Order.findAll()
        .then(orders => res.json(orders))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => res.json(order))
        .catch(next)
})

router.post('/', (req, res, next) => {
  //Incoming reqBody is going to be
  //{userEmail, shippingAddress, cart}
  let orderInfo = {
    userEmail: req.body.userEmail,
    shippingAddress: req.body.shippingAddress
  }
  let cart = req.body.cart

    Order.create(orderInfo)
        .then(order => {
          let orderId = order.id
          cart.forEach(item => {
            LineItems.create({...item, orderId})
          })
          res.json(order)
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => order.update(req.body))
        .then(updatedOrder => res.json(updatedOrder))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => order.destroy())
        .then(() => res.send(204))
        .catch(next)
})
