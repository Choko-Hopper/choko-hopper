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
const {User, Review, Product, Order, Category, LineItem, PromoCode} = require('../server/db/models')
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
    Product.create({imageUrl: 'https://images.unsplash.com/photo-1511381878266-349693efb20d?auto=format&fit=crop&w=1001&q=80', name: 'Milk Chocolate', price: 5, description: 'This milk chocolate is very good.', categoryId: 1, quantity: 5}),
    Product.create({imageUrl: 'https://images.unsplash.com/photo-1511473235658-cb73f62c7a1b?auto=format&fit=crop&w=1050&q=80', name: 'Dark Chocolate', price: 6.5, description: 'This dark chocolate is very good.', categoryId: 2, quantity: 0}),
    Product.create({imageUrl: 'http://wafflesatnoon.com/wp-content/uploads/2013/08/white-chocolate.jpg', name: 'White Chocolate', price: 5.25, description: 'This white chocolate is very good.', categoryId: 3, quantity: 30}),
    Product.create({imageUrl: 'https://static.pexels.com/photos/6345/dark-brown-milk-candy.jpg', name: 'Dark Chocolate with Nuts', price: 7, description: 'This dark chocolate with nuts is very good.', categoryId: 2, quantity: 75}),
    Product.create({imageUrl: 'https://static.pexels.com/photos/40022/chocolates-white-chocolate-chocolate-nibble-40022.jpeg', name: 'Assorted Chocolates with Raspberries', price: 7.5, isInStock: false, description: 'So much variety', categoryId: 2, quantity: 50}),
    Product.create({imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/White_chocolate_with_rose_petals.jpg/1200px-White_chocolate_with_rose_petals.jpg', name: 'White Chocolate Crunch', price: 5, description: 'This white chocolate crunch is very good.', categoryId: 3, quantity: 78}),
    Product.create({imageUrl: 'https://images.unsplash.com/photo-1492203888859-e57aced099e3?auto=format&fit=crop&w=1650&q=80', name: 'Fancy Dark Chocolate', price: 12, description: 'This fancy dark chocolate is very good.', categoryId: 2, quantity: 50}),
    Product.create({imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1138&q=80', name: 'Fancy Milk Chocolate', price: 12, isInStock: false, description: 'This fancy milk chocolate is very good.', categoryId: 1, quantity: 43}),
    Product.create({imageUrl: 'https://static.pexels.com/photos/207082/pexels-photo-207082.jpeg', name: 'Fancy White Chocolate', price: 12, description: 'This fancy white chocolate is very good.', categoryId: 3, quantity: 72}),
    Product.create({imageUrl: 'https://static.pexels.com/photos/80562/chocolate-80562.jpeg', name: 'Milk Chocolate with Almonds', price: 6, description: 'This milk chocolate with almonds is very good.', categoryId: 1, quantity: 20}),
  ])

  const reviews = await Promise.all([
  Review.create({title: 'Pretty Good for Milk Chocolate', rating: 4, text: 'Not usually a fan of milk chocolate but this was actually really good.', productId: 1, userId: 3}),
  Review.create({title: 'WOW! Who would have guessed', rating: 5, text: 'I normally HATE milk chocolate! But this chocolate may have permanently changed my mind! So good!!!', productId: 1, userId: 4}),
  Review.create({title: 'Milk Chocolate isn\'t real chocolate', rating: 2, text: 'I\'ll admit that it was actually not bad as far as milk chocolate goes otherwise I would have given it 1 start, but at the end of the day milk chocolate isn\'t real chocolate. YUCK', productId: 1, userId: 1}),
  Review.create({title: "Can't agree with all the milk chocolate haters", rating: 5, text: "I LOVE THIS CHOCOLATE! I don't get why people are buying this chocolate if they hate milk chocolate... It says what it is in the name. Keep up the great work Choko, I'm a HUGE fan!", productId: 1, userId: 2}),
  Review.create({title: 'Pretty Good for Milk Chocolate', rating: 4, text: 'Not usually a fan of milk chocolate but this was actually really good.', productId: 8, userId: 3}),
  Review.create({title: 'WOW! Who would have guessed', rating: 5, text: 'I normally HATE milk chocolate! But this chocolate may have permanently changed my mind! So good!!!', productId: 8, userId: 4}),
  Review.create({title: 'Milk Chocolate isn\'t real chocolate', rating: 2, text: 'I\'ll admit that it was actually not bad as far as milk chocolate goes otherwise I would have given it 1 start, but at the end of the day milk chocolate isn\'t real chocolate. YUCK', productId: 8, userId: 1}),
  Review.create({title: "Can't agree with all the milk chocolate haters", rating: 5, text: "I LOVE THIS CHOCOLATE! I don't get why people are buying this chocolate if they hate milk chocolate... It says what it is in the name. Keep up the great work Choko, I'm a HUGE fan!", productId: 8, userId: 2}),
  Review.create({title: 'Pretty Good for Milk Chocolate', rating: 4, text: 'Not usually a fan of milk chocolate but this was actually really good.', productId: 10, userId: 3}),
  Review.create({title: 'WOW! Who would have guessed', rating: 5, text: 'I normally HATE milk chocolate! But this chocolate may have permanently changed my mind! So good!!!', productId: 10, userId: 4}),
  Review.create({title: 'Milk Chocolate isn\'t real chocolate', rating: 2, text: 'I\'ll admit that it was actually not bad as far as milk chocolate goes otherwise I would have given it 1 start, but at the end of the day milk chocolate isn\'t real chocolate. YUCK', productId: 10, userId: 1}),
  Review.create({title: "Can't agree with all the milk chocolate haters", rating: 5, text: "I LOVE THIS CHOCOLATE! I don't get why people are buying this chocolate if they hate milk chocolate... It says what it is in the name. Keep up the great work Choko, I'm a HUGE fan!", productId: 10, userId: 2}),
  Review.create({title: "I LOVE THIS CHOCOLATE", rating: 5, text: "This is absolutely amazing! Love it.", productId: 7, userId: 2}),
  Review.create({title: "Now that's a chocolate", rating: 5, text: "No words can describe how much I love this chocolate", productId: 7, userId: 1}),
  Review.create({title: "It's alright", rating: 4, text: "... I'm a hater and I can't even find anything bad to say about it.", productId: 7, userId: 3}),
  Review.create({title: "EWWWWWWW", rating: 1, text: "So bitter, why do people eat this stuff?", productId: 7, userId: 4}),
  Review.create({title: "I LOVE THIS CHOCOLATE", rating: 5, text: "This is absolutely amazing! Love it.", productId: 2, userId: 2}),
  Review.create({title: "Now that's a chocolate", rating: 5, text: "No words can describe how much I love this chocolate", productId: 2, userId: 1}),
  Review.create({title: "It's alright", rating: 4, text: "... I'm a hater and I can't even find anything bad to say about it.", productId: 2, userId: 3}),
  Review.create({title: "EWWWWWWW", rating: 1, text: "So bitter, why do people eat this stuff?", productId: 2, userId: 4}),
  Review.create({title: "I LOVE THIS CHOCOLATE", rating: 5, text: "This is absolutely amazing! Love it.", productId: 4, userId: 2}),
  Review.create({title: "Now that's a chocolate", rating: 5, text: "No words can describe how much I love this chocolate", productId: 4, userId: 1}),
  Review.create({title: "It's alright", rating: 4, text: "... I'm a hater and I can't even find anything bad to say about it.", productId: 4, userId: 3}),
  Review.create({title: "EWWWWWWW", rating: 1, text: "So bitter, why do people eat this stuff?", productId: 4, userId: 4}),
  Review.create({title: "I LOVE THIS CHOCOLATE", rating: 5, text: "This is absolutely amazing! Love it.", productId: 5, userId: 2}),
  Review.create({title: "Now that's a chocolate", rating: 5, text: "No words can describe how much I love this chocolate", productId: 5, userId: 1}),
  Review.create({title: "It's alright", rating: 4, text: "... I'm a hater and I can't even find anything bad to say about it.", productId: 5, userId: 3}),
  Review.create({title: "EWWWWWWW", rating: 1, text: "So bitter, why do people eat this stuff?", productId: 5, userId: 4}),
  Review.create({title: "NOT EVEN CHOCOLATE", rating: 1, text: "This. Is. Not. Chocolate.", productId: 3, userId: 2}),
  Review.create({title: "How can Choko even sell white chocolate", rating: 1, text: "Agree. Not Chocolate.", productId: 3, userId: 1}),
  Review.create({title: "It's alright", rating: 2, text: "I still hate white chocolate, but this is okay...", productId: 3, userId: 3}),
  Review.create({title: "EWWWWWWW", rating: 1, text: "YUCK", productId: 3, userId: 4}),
  Review.create({title: "NOT EVEN CHOCOLATE", rating: 1, text: "This. Is. Not. Chocolate.", productId: 6, userId: 2}),
  Review.create({title: "How can Choko even sell white chocolate", rating: 1, text: "Agree. Not Chocolate.", productId: 6, userId: 1}),
  Review.create({title: "It's alright", rating: 2, text: "I still hate white chocolate, but this is okay...", productId: 6, userId: 3}),
  Review.create({title: "EWWWWWWW", rating: 1, text: "YUCK", productId: 6, userId: 4}),
  Review.create({title: "NOT EVEN CHOCOLATE", rating: 1, text: "This. Is. Not. Chocolate.", productId: 9, userId: 2}),
  Review.create({title: "How can Choko even sell white chocolate", rating: 1, text: "Agree. Not Chocolate.", productId: 9, userId: 1}),
  Review.create({title: "It's alright", rating: 2, text: "I still hate white chocolate, but this is okay...", productId: 9, userId: 3}),
  Review.create({title: "EWWWWWWW", rating: 1, text: "YUCK", productId: 9, userId: 4}),
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
  const promoCodes = await Promise.all([
    PromoCode.create({code: '25OFF', percentOff: 25}),
    PromoCode.create({code: '30OFF', percentOff: 30}),
    PromoCode.create({code: '50OFF', percentOff: 50}),
    PromoCode.create({code: 'OOPSIES', percentOff: 20})
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${lineItems.length} line items`)
  console.log(`seeded ${promoCodes.length} promo codes`)
  console.log(`seeded ${reviews.length} reviews`)
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
