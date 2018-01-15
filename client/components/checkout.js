import React from 'react'
import { connect } from 'react-redux'
import { submitCart, validateCode } from '../store'
import { withRouter, Link } from 'react-router-dom'
import StripeCheckoutComponent from './stripeCheckout'

/**
 * COMPONENT
 */
const Checkout = props => {
  return (
    <div>
      {props.currentUser && (
        <div>
          <h3>Checkout Information</h3>
          <form onSubmit={props.handleSubmit} name="checkoutForm">
            <div>
              <label htmlFor="userEmail">
                <small>Your email address: </small>
              </label>
              <input
                name="userEmail"
                type="text"
                placeholder="yourName@domain.com"
              />
            </div>
            <div>
              <label htmlFor="shippingAddress">
                <small>Shipping address:</small>
              </label>
              <input
                name="shippingAddress"
                type="text"
                placeholder="123 Main Street, New York, NY 10021"
              />
            </div>

            <div>
              <button type="submit">SUBMIT MY ORDER</button>
            </div>
          </form>
          <form onSubmit={props.promoSubmit}>
            <label>
              <small>Promo Code: </small>
            </label>
            <input type="text" name="code" placeholder="Enter Promo Code..." />
            <button>Apply Code</button>
          </form>
          <StripeCheckoutComponent
            name="chocolate"
            description="mmmmmm"
            amount={100}
          />
        </div>
      )}
    </div>
  )
}

const mapState = state => {
  return {
    cart: state.cart.cart,
    currentUser: state.user,
    orderId: state.cart.orderId
  }
}

const mapDispatch = dispatch => ({
  handleSubmit: (evt) => {
    evt.preventDefault()
    const orderInfo = {
      userEmail: evt.target.userEmail.value,
      shippingAddress: evt.target.shippingAddress.value
    }
    dispatch(submitCart(orderInfo))
  },
  promoSubmit: evt => {
    evt.preventDefault()
    const code = evt.target.code.value
    dispatch(validateCode(code))
  } 
})

export default connect(mapState, mapDispatch)(Checkout)
