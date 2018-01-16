/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Product, Order, Category, LineItem} = require('../server/db/models')
async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'jazzy@jazzy.com', password: '123', isAdmin: true}),
    User.create({email: 'katy@katy.com', password: '123', isAdmin: true}),
    User.create({email: 'lemona@lemona.com', password: '123', isAdmin: true}),
    User.create({email: 'annabel@annabel.com', password: '123', isAdmin: true}),
    User.create({email: 'dan@dan.com', password: '123'}),
    User.create({email: 'tom@tom.com', password: '123'}),
    User.create({email: 'kate@kate.com', password: '123'}),
    User.create({email: 'leah@leah.com', password: '123'}),
  ])
  const categories = await Promise.all([
    Category.create({name: 'milk chocolate'}),
    Category.create({name: 'dark chocolate'}),
    Category.create({name: 'white chocolate'})
  ])

  const products = await Promise.all([
    Product.create({name: 'Milk Chocolate', price: 500, description: 'This milk chocolate is very good.', categoryId: 1, quantity: 5}),
    Product.create({name: 'Dark Chocolate', price: 650, description: 'This dark chocolate is very good.', categoryId: 2, quantity: 0}),
    Product.create({name: 'White Chocolate', price: 525, description: 'This white chocolate is very good.', categoryId: 3, quantity: 30}),
    Product.create({name: 'Dark Chocolate with Nuts', price: 700, description: 'This dark chocolate with nuts is very good.', categoryId: 2, quantity: 75}),
    Product.create({name: 'Dark Chocolate with Raspberry', price: 750, isInStock: false, description: 'This dark chocolate with raspberry is very good.', categoryId: 2, quantity: 50}),
    Product.create({name: 'White Chocolate Crunch', price: 500, description: 'This white chocolate crunch is very good.', categoryId: 3, quantity: 78}),
    Product.create({name: 'Fancy Dark Chocolate', price: 1200, description: 'This fancy dark chocolate is very good.', categoryId: 2, quantity: 50}),
    Product.create({name: 'Fancy Milk Chocolate', price: 1200, isInStock: false, description: 'This fancy milk chocolate is very good.', categoryId: 1, quantity: 43}),
    Product.create({name: 'Fancy White Chocolate', price: 1200, description: 'This fancy white chocolate is very good.', categoryId: 3, quantity: 72}),
    Product.create({name: 'Milk Chocolate with Almonds', price: 600, description: 'This milk chocolate with almonds is very good.', categoryId: 1, quantity: 20}),
  ])
  const orders = await Promise.all([
    Order.create({userId: 4, userEmail: 'katy@katy.com', shippingAddress: '5 Hanover Square, Floor 25, New York, NY 10004', items: [{productId: 2, unitPrice: 6.5, quantity: 1}]}),
    Order.create({userId: 3, userEmail: 'jazzy@jazzy.com', shippingAddress: '6 Hanover Square, Floor 25, New York, NY 10004', items: [{productId: 3, unitPrice: 5, quantity: 2}]}),
    Order.create({userId: 6, userEmail: 'annabel@annabel.com', shippingAddress: '7 Hanover Square, Floor 25, New York, NY 10004', items: [{productId: 10, unitPrice: 6, quantity: 3}]}),
    Order.create({userId: 5, userEmail: 'lemona@lemona.com', shippingAddress: '9 Hanover Square, Floor 25, New York, NY 10004', items: [{productId: 7, unitPrice: 12, quantity: 1}]}),
    Order.create({userId: 8, userEmail: 'tom@tom.com', shippingAddress: '5 Hanover Square, Floor 25, New York, NY 10004', items: [{productId: 3, unitPrice: 5, quantity: 2}]}),
    Order.create({userId: 9, userEmail: 'kate@kate.com', shippingAddress: '5 Hanover Square, Floor 25, New York, NY 10004', items: [{productId: 7, unitPrice: 12, quantity: 1}]}),
    Order.create({userId: 7, userEmail: 'dan@dan.com', shippingAddress: '5 Hanover Square, Floor 25, New York, NY 10004', items: [{productId: 2, unitPrice: 6.5, quantity: 4}]}),
  ])
  const lineItems = await Promise.all([
    LineItem.create({orderId: 1, productId: 2, unitPrice: 6.5, quantity: 1}),
    LineItem.create({orderId: 2, productId: 3, unitPrice: 5, quantity: 2}),
    LineItem.create({orderId: 3, productId: 10, unitPrice: 6, quantity: 3}),
    LineItem.create({orderId: 4, productId: 7, unitPrice: 12, quantity: 1}),
    LineItem.create({orderId: 5, productId: 3, unitPrice: 5, quantity: 2}),
    LineItem.create({orderId: 6, productId: 7, unitPrice: 12, quantity: 1}),
    LineItem.create({orderId: 7, productId: 2, unitPrice: 6.5, quantity: 4}),
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${lineItems.length} line items`)
  console.log(`seeded successfully`)
}
// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
