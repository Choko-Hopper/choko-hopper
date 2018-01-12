import React from 'react'
import {connect} from 'react-redux'
import {submitCart} from '../store'

/**
 * COMPONENT
 */
const Checkout = (props) => {
 console.log("Rendering CHECKOUT component")

  return (

    <div>
    { props.currentUser &&
    <div>
      <h3>Checkout Information</h3>
      <form onSubmit={props.handleSubmit} name="checkoutForm">
        <div>
          <label htmlFor="userEmail"><small>Your email address: </small></label>
          <input name="userEmail" type="text" placeholder="yourName@domain.com" />
        </div>
        <div>
          <label htmlFor="shippingAddress"><small>Shipping address:</small></label>
          <input name="shippingAddress" type="text" placeholder="123 Main Street, New York, NY 10021" />
        </div>

        <div>
          <button type="submit">SUBMIT MY ORDER</button>
        </div>
      </form>
      </div>
    }
    </div>
  )
}

const mapState = (state) => {
  return {
    cart: state.cart,
    currentUser: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()

      const orderInfo = {
        userEmail: evt.target.userEmail.value,
        shippingAddress: evt.target.shippingAddress.value,
      }
      dispatch(submitCart(orderInfo))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)

