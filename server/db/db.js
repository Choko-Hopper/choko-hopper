const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/choko-hopper', {
    logging: false
  }
)
console.log('DATABASE_URL', process.env.DATABASE_URL)
module.exports = db
