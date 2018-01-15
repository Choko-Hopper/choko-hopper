import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchOrderHistory } from '../store'

class OrderLineItems extends Component {
  componentDidMount() { 
    this.props.handleFetchOrderHistory()
  }
  
  render(){
  console.log('i am props', this.props)
  let orderId = +this.props.match.params.orderId
  let orderHistory = this.props.orderHistory
  let currentOrder = orderHistory.find(order => order.id === orderId)
    console.log('currentOrder', currentOrder)

  return (
    <div>
    <h4>HEY!</h4>
    {currentOrder &&
    currentOrder.products.map(product => {
    let productId = product.lineItem.productId
    let itemTotal = product.lineItem.unitPrice * product.lineItem.quantity
    console.log('!!!!!!!!', product)
    return (
      product &&
      <tr key={product.id} className="line-item" >
        <th scope="row" className="line-item-img col-2">
          <Link to={`/products/${productId}`} >
            <img src={product.imageUrl} />
          </Link>
        </th>
        <td className="col-5">{product.name}</td>
        <td className="col-1">$</td>
        <td className="col-1">$</td>
      </tr>
    )
  })}
  </div>)
}
}

  /**
 * CONTAINER
 */
const mapState = ({ user, orderHistory }) => ({user, orderHistory})
const mapDispatch = (dispatch, ownProps) => ({
  handleFetchOrderHistory() {
    console.log('im the id', +ownProps.match.params.userId )
    dispatch(fetchOrderHistory(+ownProps.match.params.userId))
  }
})

export default connect(mapState, mapDispatch)(OrderLineItems)