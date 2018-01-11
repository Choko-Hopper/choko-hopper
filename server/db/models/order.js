const Sequelize = require('sequelize')
const db = require('../db')
const LineItems = require('./lineItems.js')

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
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return LineItems.findAll({
        where: { orderId: this.getDataValue('id') }
      }).reduce(
        (accumulator, lineItem) =>
          accumulator + lineItem.unitPrice * lineItem.quantity
      )
    }
  }
})

module.exports = Order
