import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import UpdateCart  from './update-cart'

function Cart(props) {

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
          </tr>
        </thead>
        <tbody>
            {props.currentUser &&
              props.cart.map(cartItem => {
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
                    <td className="col-1">${cartItem.unitPrice}</td>
                    <td className="col-1">${cartItem.unitPrice * cartItem.quantity}</td>
                  </tr>
                )
              })
            }
        </tbody>
        </table>
      </div>
      <div className="col-3">
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  )
}

//cart-->  [{productId: X, quantity: X, unitPrice: X}]

const mapState = function (state) {
  return {
    products: state.products,
    currentUser: state.user,
    cart: state.cart
  }
}

export default connect(mapState, null)(Cart)
