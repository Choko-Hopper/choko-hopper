const router = require('express').Router()
const { Order, LineItem, Product } = require('../db/models')
const isAdmin = require('./isAdmin')
module.exports = router

router.get('/', isAdmin, (req, res, next) => {
    Order.findAll()
        .then(orders => res.json(orders))
        .catch(next)
})

router.get('/line-items', isAdmin, (req, res, next) => {
  LineItem.findAll()
      .then(lineItems => res.json(lineItems))
      .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  const { orderId } = req.params
  Order.findById(orderId)
    .then(order => {
      if (req.user && req.user.id === order.userId) {
        res.json(order)
      } else {
        const err = new Error('This order is not associated with your account.')
        err.status = 401
        next(err)
      }
    })
    .catch(next)
})

router.get('/my-orders/:userId', (req, res, next) => {
  const { userId } = req.params

  Order.findAll({
    where: {
      userId
    },
    include: [{model: Product, attributes: ['name', 'imageUrl']}]
  })
    .then(orders => {
      if (!orders.length) {res.json([])}
      else if (req.user && req.user.id === orders[0].userId) {
        res.json(orders)
      } else {
        const err = new Error('These orders are not associated with your account.')
        err.status = 401
        next(err)
      }
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  //Incoming reqBody is going to be
  //{userEmail, shippingAddress, cart}
  let orderInfo = {
    userEmail: req.body.userEmail,
    shippingAddress: req.body.shippingAddress,
    userId: req.user.id
  }
  let cart = req.body.cart

    Order.create(orderInfo)
        .then(order => {
          let orderId = order.id
          cart.forEach(item => {
            LineItem.create({...item, orderId})
          })
          res.json(order)
        })
        .catch(next)
})

router.put('/:id', isAdmin, (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => order.update(req.body))
        .then(updatedOrder => res.json(updatedOrder))
        .catch(next)
})

router.delete('/:id', isAdmin, (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => order.destroy())
        .then(() => res.send(204))
        .catch(next)
})
