import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { submitCart } from '../store'

const STRIPE_PUBLISHABLE = 'pk_test_BjdBrWKAZMF0Lwo9Pncz4SxF'
const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'http://choko-hopper.herokuapp.com/auth/checkout'
  : 'http://localhost:8080/auth/checkout'

const CURRENCY = 'USD'

const fromUSDToCent = amount => amount * 100

const onToken = (amount, description, handleSuccess) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(() => {
      handleSuccess()
      alert('Payment Successful')
    })
    .catch(() => alert('Payment Error'))

const Checkout = ({ name, description, amount, handleSuccess}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description, handleSuccess)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)

const mapState = ({ products, cart }) => ({ products, cart })
const mapDispatch = (dispatch) => ({
  handleSuccess: () => {
    dispatch(submitCart(orderInfo))
  }
})
export default Checkout
