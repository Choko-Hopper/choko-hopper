import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import UpdateCart from './update-cart'
import { deleteLineItem, updateOrderTotal } from '../store'
import Checkout from './checkout'

function Cart(props) {
  let cartTable
  let orderSubtotal = 0
  let discount = 0
  let orderTotal = orderSubtotal

  if (props.cart.length === 0) {
    cartTable = (
      <tr className="line-item">
        <th scope="row" className="line-item-img col-2" />
        <td className="col-5">Your cart is empty</td>
      </tr>
    )
  } else {
    cartTable = props.cart.map(cartItem => {
      let singleProduct = props.products.find(
        product => +product.id === +cartItem.productId
      )
      let itemTotal = cartItem.unitPrice * cartItem.quantity
      orderSubtotal += itemTotal
      orderTotal = orderSubtotal - discount
      props.handleTotal(orderTotal)

      return (
        singleProduct && (
          <tr key={cartItem.productId} className="line-item">
            <th scope="row" className="line-item-img col-2">
              <Link to={`/products/${cartItem.productId}`}>
                <img src={singleProduct.imageUrl} />
              </Link>
            </th>
            <td className="col-5">{singleProduct.name}</td>
            <td className="col-3">
              <UpdateCart
                product={singleProduct}
                quantity={cartItem.quantity}
              />
            </td>
            <td className="col-1">${cartItem.unitPrice.toFixed(2)}</td>
            <td className="col-1">${itemTotal.toFixed(2)}</td>
            <td className="col-1">
              <button
                type="button"
                className="deleteButton btn btn-link fa fa-times"
                value={cartItem.productId}
                onClick={props.handleClick}
              />
            </td>
          </tr>
        )
      )
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-7">
          <h4 className="cart-title">Items in Your Cart</h4>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Product</th>
                <th scope="col" />
                <th scope="col">Quantity</th>
                <th scope="col">Each</th>
                <th scope="col">Total</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{props.currentUser && cartTable}</tbody>
          </table>
        </div>
        <div className="col-1" />
        <div className="col-3">
          <h4 className="cart-title">Order Total</h4>
          <table className="table">
            <tbody>
              <tr>
                <th scope="col">Order Subtotal:</th>
                <th scope="col">${orderSubtotal.toFixed(2)}</th>
              </tr>
              <tr className="line-item">
                <th scope="col">Discount:</th>
                <th scope="col">${discount.toFixed(2)}</th>
              </tr>
              <tr className="line-item">
                <th scope="col">Order Total:</th>
                <th scope="col">${orderTotal.toFixed(2)}</th>
              </tr>
            </tbody>
          </table>
          <form className="discount-code form-inline align-items-center">
            <div className="form-row d-flex justify-content-between">
              <label htmlFor="inputPromo" className="sr-only">
                Apply Promo Code
              </label>
              <input
                type="text"
                className="form-control col-7"
                id="inputPromo"
                placeholder="Promo Code"
              />
              <button type="submit" className="btn btn-primary col-4">
                Apply
              </button>
            </div>
          </form>
          <Checkout />
        </div>
      </div>
    </div>
  )
}

//cart-->  [{productId: X, quantity: X, unitPrice: X}]

const mapState = function(state) {
  return {
    products: state.products,
    currentUser: state.user,
    cart: state.cart.cart
  }
}

const mapDispatch = dispatch => ({
  handleClick(evt) {
    evt.preventDefault()
    let productId = evt.target.value
    dispatch(deleteLineItem(productId))
  },
  handleTotal(orderTotal) {
    dispatch(updateOrderTotal(orderTotal))
  }
})

export default connect(mapState, mapDispatch)(Cart)
