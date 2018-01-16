import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchOrderHistory } from '../store'

class OrderLineItems extends Component {
  componentDidMount() {
    this.props.handleFetchOrderHistory()
  }

  render() {
    console.log('i am props', this.props)
    let orderId = +this.props.match.params.orderId
    let orderHistory = this.props.orderHistory
    let currentOrder = orderHistory.find(order => order.id === orderId)
    let orderSubtotal = 0
    let discount = 0
    let orderTotal = orderSubtotal


    console.log('currentOrder', currentOrder)

    return (
      <div>
        <button type="button" className="btn btn-link" onClick={this.props.handleClick}><i className="fa fa-long-arrow-left" aria-hidden="true" />Previous Orders</button>
        <h4 className="order-heading"><b>Order Details</b></h4>
        {currentOrder &&
          <div>
            <div className="order-header row">
              <div className="order-heading col-3"><b>Order #:</b> {orderId}</div>
              <div className="order-heading col-3"><b>Order Date:</b> {currentOrder.createdAt.slice(0, 10)}</div>
              <div className="order-heading col-3"><b>Shipping Address:</b> <br />{currentOrder.shippingAddress}</div>
              <div className="order-heading col-3"><b>Status:</b> {currentOrder.status === 'Created' ? 'Pending' : currentOrder.status}</div>
            </div>
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
                {currentOrder.products.map(product => {
                  let productId = product.lineItem.productId
                  let itemTotal = product.lineItem.unitPrice * product.lineItem.quantity
                  orderSubtotal += itemTotal
                  orderTotal = orderSubtotal - discount

                  return (
                    product &&
                    <tr key={productId} className="line-item" >
                      <th scope="row" className="line-item-img col-2">
                        <Link to={`/products/${productId}`} >
                          <img src={product.imageUrl} />
                        </Link>
                      </th>
                      <td className="col-5">{product.name}</td>
                      <td className="col-5">{product.lineItem.quantity}</td>
                      <td className="col-1">${product.lineItem.unitPrice}</td>
                      <td className="col-1">${itemTotal}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="d-flex flex-row-reverse">
              <div className="col-4">
                <h4 className="order-heading"><b>Order Total</b></h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="col" className="order-heading"><b>Order Subtotal:</b></th>
                      <th scope="col">${orderSubtotal.toFixed(2)}</th>
                    </tr>
                    <tr className="line-item" >
                      <th scope="col" className="order-heading"><b>Discount:</b></th>
                      <th scope="col">${discount.toFixed(2)}</th>
                    </tr>
                    <tr className="line-item" >
                      <th scope="col" className="order-heading"><b>Order Total:</b></th>
                      <th scope="col">${orderTotal.toFixed(2)}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

/**
* CONTAINER
*/
const mapState = ({ user, orderHistory }) => ({ user, orderHistory })
const mapDispatch = (dispatch, ownProps) => ({
  handleFetchOrderHistory() {
    dispatch(fetchOrderHistory(+ownProps.userId))
  },
  handleClick(evt) {
    // on click change view
    evt.preventDefault()
    console.log('das my shit', ownProps)
    ownProps.history.push('/account/orders')
  }
})

export default connect(mapState, mapDispatch)(OrderLineItems)