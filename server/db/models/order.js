const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define('order', {
  userEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  shippingAddress: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  items: {
    type: Sequelize.JSON,
    defaultValue: {}
    // {2: [1, 5.25]}  object will have productId as key, and array [quantity, price] as value.
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get () {
      let total = 0
      for (product in this.items) {
        let quantity = this.items[product][0]
        let unitPrice = this.items[product][1]
        total += quantity * unitPrice
      }
      return total
    }
  }
})

module.exports = Order
