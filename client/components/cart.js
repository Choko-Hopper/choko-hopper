import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import UpdateCart from './update-cart'
import { deleteLineItem, updateOrderSubTotal, updateOrderTotal } from '../store'
import Checkout from './checkout'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      cart,
      orderSubTotal,
      discount,
      handleSubTotal,
      handleTotal
    } = this.props
    if (cart.length) {
      const newSubTotal = cart
        .map(cartItem => {
          return +cartItem.unitPrice * +cartItem.quantity
        })
        .reduce((a, b) => a + b)
      handleSubTotal(newSubTotal)
    }
    const discountAmount = orderSubTotal * (discount / 100)
    const newTotal = orderSubTotal - discountAmount
    handleTotal(newTotal)
  }

  render() {
    let cartTable
    const props = this.props
    const { orderSubTotal, discount, orderTotal } = this.props

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
                  <th scope="col">Order SubTotal:</th>
                  <th scope="col">${orderSubTotal.toFixed(2)}</th>
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
}

//cart-->  [{productId: X, quantity: X, unitPrice: X}]

const mapState = state => ({
  products: state.products,
  currentUser: state.user,
  orderSubTotal: state.cart.orderSubTotal,
  discount: state.cart.discount,
  orderTotal: state.cart.orderTotal,
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
  },
  handleTotal(orderTotal) {
    dispatch(updateOrderTotal(orderTotal))
  },
  handleSubTotal(orderSubTotal) {
    dispatch(updateOrderSubTotal(orderSubTotal))
  }
})

export default connect(mapState, mapDispatch)(Cart)
