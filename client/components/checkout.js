import React from 'react'
import { connect } from 'react-redux'
import { updateUserInfo } from '../store'
import StripeCheckoutComponent from './stripeCheckout'

/**
 * COMPONENT
 */
const Checkout = props => {
  return (
    <div>
      <h3>Checkout Information</h3>
      <form name="checkoutForm">
        <div>
          <label htmlFor="userEmail">
            <small>Your email address: </small>
          </label>
          <input
            name="userEmail"
            type="text"
            placeholder="yourName@domain.com"
            value={props.userEmail}
            onChange={props.handleChange}
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
            value={props.shippingAddress}
            onChange={props.handleChange}
          />
        </div>
      <StripeCheckoutComponent />
      </form>
    </div>
  )
}

const mapState = ({ cart }) => ({
  shippingAddress: cart.shippingAddress,
  userEmail: cart.userEmail
})

const mapDispatch = (dispatch) => ({
  handleChange: evt => {
    dispatch(updateUserInfo({[evt.target.name]: evt.target.value}))
  }
})

export default connect(mapState, mapDispatch)(Checkout)
