import React from 'react'
import { deleteLineItem } from '../store'
import { connect } from 'react-redux'
import UpdateCart from './update-cart'
import { Link } from 'react-router-dom'

const CartTable = props => {
  let cartTable

  if (props.cart.length === 0) {
    cartTable = (
      <tr className="line-item">
        <th scope="row" className="line-item-img col-2" />
        <td className="col-5">Your cart is empty</td>
      </tr>
    )
  } else {
    cartTable = props.cart.map(cartItem => {
      const singleProduct = cartItem.cartProduct
      let itemTotal = cartItem.unitPrice * cartItem.quantity

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
  return cartTable
}

const mapState = state => ({
  cart: state.cart.cart.map(cartItem => {
    const cartProduct = state.products.find(
      product => +product.id === +cartItem.productId
    )
    return Object.assign({}, cartItem, { cartProduct })
  })
})

const mapDispatch = dispatch => ({
  handleClick(evt) {
    evt.preventDefault()
    let productId = evt.target.value
    dispatch(deleteLineItem(productId))
  }
})

export default connect(mapState, mapDispatch)(CartTable)
