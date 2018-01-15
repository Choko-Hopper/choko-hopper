const Sequelize = require('sequelize')
const db = require('../db')
const LineItem = require('./lineItem')

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
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Created'
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return LineItem.findAll({
        where: { orderId: this.getDataValue('id') }
      }).reduce(
        (accumulator, lineItem) =>
          accumulator + lineItem.unitPrice * lineItem.quantity
      )
    }
  }
})

module.exports = Order
