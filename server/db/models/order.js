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
    type: Sequelize.ARRAY(Sequelize.JSON)

    // [{productId: 1, unitPrice: 5, quantity: 3}]
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get () {
      let total = 0
     this.items.forEach(item => {
       total += item.unitPrice * item.quantity
     })
      return total
    }
  }
})

module.exports = Order
