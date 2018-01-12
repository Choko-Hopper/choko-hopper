const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = require('express').Router()
const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY

module.exports = router

router.get("/", (req, res) =>
  res.render("index.pug", {keyPublishable}))


router.post('/auth/checkout', (req, res, next) => {
  const {amount, description} = req.body
  stripe.charges.create({
    amount,
    currency: 'usd',
    description
  })
})
