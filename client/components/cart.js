import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import UpdateCart  from './update-cart'
import {deleteLineItem} from '../store'

function Cart(props) {
  let cartTable
  if (props.cart.length === 0) {
    cartTable = (
      <tr className="line-item" >
        <th scope="row" className="line-item-img col-2" />
        <td className="col-5">Your cart is empty</td>
      </tr>
    )} else {
    cartTable = props.cart.map(cartItem => {
      let singleProduct = props.products.find((product) => +product.id === +cartItem.productId)

      return (
        singleProduct &&
        <tr key={cartItem.productId} className="line-item" >
          <th scope="row" className="line-item-img col-2">
            <Link to={`/products/${cartItem.productId}`} >
              <img src={singleProduct.imageUrl} />
            </Link>
          </th>
          <td className="col-5">{singleProduct.name}</td>
          <td className="col-3"><UpdateCart product={singleProduct} quantity={cartItem.quantity} /></td>
          <td className="col-1">${cartItem.unitPrice.toFixed(2)}</td>
          <td className="col-1">${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}</td>
          <td className="col-1"><button value={cartItem.productId} onClick={props.handleClick}>Delete</button></td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h1>My Cart</h1>
      <div className="col-9">
        <h2>Items in Your Cart</h2>
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
        <tbody>
            {props.currentUser && cartTable}
        </tbody>
        </table>
      </div>
      <div className="col-3">
        <Link to="/checkout">Checkout</Link>
      </div>
      <div className="col-3">
      </div>
    </div>
  )
}

//cart-->  [{productId: X, quantity: X, unitPrice: X}]

const mapState = function (state) {
  return {
    products: state.products,
    currentUser: state.user,
    cart: state.cart.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick (evt) {
      evt.preventDefault()
      let productId = evt.target.value
      dispatch(deleteLineItem(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
