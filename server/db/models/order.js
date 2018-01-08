const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define('order', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

Order.findTotal = function(orderId, userId) {
  Order.findAll({
    where: {
      userId,
      orderId
    },
    include: [Product]
  })
  .then(orders => {
    let total = 0
    orders.forEach(function(order) {
      total += order.product.price * order.quantity
    })
    return total
  })
  .catch(err => console.error(err))
}

module.exports = Order
