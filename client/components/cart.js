import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteLineItem, fetchTotals, validatePromoCode } from '../store'
import Checkout from './checkout'
import CartTable from './cart-table'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.handleTotals()
  }

  render() {
    const props = this.props
    const { orderSubTotal, discount, orderTotal } = this.props

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
              <tbody>{props.currentUser && <CartTable />}</tbody>
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
            <form
              onSubmit={props.handlePromo}
              className="discount-code form-inline align-items-center"
            >
              <div className="form-row d-flex justify-content-between">
                <label htmlFor="inputPromo" className="sr-only">
                  Apply Promo Code
                </label>
                <input
                  type="text"
                  className="form-control col-7"
                  name="promoCode"
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
  handleTotals() {
    dispatch(fetchTotals())
  },
  handlePromo(evt) {
    evt.preventDefault()
    dispatch(validatePromoCode(evt.target.promoCode.value))
  }
})

export default connect(mapState, mapDispatch)(Cart)
