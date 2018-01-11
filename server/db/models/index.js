const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Category = require('./category')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Order.belongsToMany(Product, { through: 'line-items' })
Product.belongsToMany(Order, { through: 'line-items' })

Order.belongsTo(User)
User.hasMany(Order)

Category.belongsToMany(Product, { through: 'product-categories' })
Product.belongsToMany(Category, { through: 'product-categories' })

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  Category
}
