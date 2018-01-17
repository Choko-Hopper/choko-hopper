import React from 'react'
import {connect} from 'react-redux'
import {submitCart} from '../store'

/**
 * COMPONENT
 */
const CheckoutConfirm = (props) => {
  let thisOrder = props.order
  return (
    <div>
    { thisOrder &&
      <div>
      <p>You have successfully submitted your order. Your order number is #{thisOrder.id}.</p>
      <p>A confirmation email has been sent to {thisOrder.userEmail}.</p>
      </div>

    }
    </div>
  )
}

const mapState = (state) => {
  return {
    cart: state.cart.cart,
    currentUser: state.user,
    order: state.cart.lastOrder
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

