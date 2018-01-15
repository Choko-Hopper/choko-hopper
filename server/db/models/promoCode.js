const Sequelize = require('sequelize')
const db = require('../db')

const PromoCode = db.define('promo-code', {
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  percentOff: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  expiration: {
    type: Sequelize.DATE
  }
})

module.exports = PromoCode
