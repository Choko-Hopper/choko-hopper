const Sequelize = require('sequelize')
const db = require('../db')

const LineItems = db.define('line-items', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  unitPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = LineItems
