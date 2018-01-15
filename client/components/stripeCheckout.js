import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { submitCart } from '../store'

const STRIPE_PUBLISHABLE = 'pk_test_BjdBrWKAZMF0Lwo9Pncz4SxF'
const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://choko-hopper.herokuapp.com/auth/checkout'
    : 'http://localhost:8080/auth/checkout'

const CURRENCY = 'USD'

const fromUSDToCent = amount => amount * 100

const onToken = (amount, description, handleSuccess, cart) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(() => {
      handleSuccess(cart)
      alert('Payment Successful')
    })
    .catch(() => alert('Payment Error'))

const Checkout = ({ description, amount, handleSuccess, cart }) => (
  <div>
    <StripeCheckout
      name="Your Chocolate Order"
      description={description}
      amount={fromUSDToCent(amount)}
      token={onToken(amount, description, handleSuccess, cart)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
  </div>
)

const findDescription = (cart, products) => {
  let cartProducts = cart.cart.map(cartItem => {
    let result = products.find(product => product.id === cartItem.productId)
    return result ? result.name : result
  }
  )
  return cartProducts.length
    ? cartProducts.reduce((accumulator, item) => {
      return accumulator + ', ' + item
    })
    : ''
}

const mapState = ({ products, cart }) => ({
  products,
  cart,
  amount: cart.orderTotal,
  description: findDescription(cart, products)
})
const mapDispatch = dispatch => ({
  handleSuccess: cart => {
    dispatch(submitCart(cart))
  }
})
export default connect(mapState, mapDispatch)(Checkout)
