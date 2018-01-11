const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  },
  text: {
    type: Sequelize.TEXT
  }
})

module.exports = Review
