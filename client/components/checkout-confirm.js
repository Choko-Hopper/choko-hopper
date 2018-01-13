import React from 'react'
import {connect} from 'react-redux'
import {submitCart} from '../store'

/**
 * COMPONENT
 */
const CheckoutConfirm = (props) => {
  return (

    <div>
    You have successfully submitted your order.
    </div>
  )
}

const mapState = (state) => {
  return {
    cart: state.cart.cart,
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

export default connect(mapState, mapDispatch)(CheckoutConfirm)

