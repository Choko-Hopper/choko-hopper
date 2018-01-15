import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReviewForm from './review-form'
import { fetchOrderHistory } from '../store'
import UpdateCart  from './update-cart'

class OrderHistory extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchOrderHistory()
    console.log('sent off fetch for OrderHistory')
  }


  render() {

    const isLoggedIn = !!this.props.user.id
    let message;
      if (!isLoggedIn) {message = <div>You must be logged in to see your Order History.</div>}

      else if (this.props.orderHistory && this.props.orderHistory.length) {message =
        (<div>
          <ul>
        {this.props.orderHistory && this.props.orderHistory.map(order => {
         return (
           <div key={order.id} >
           <li>Order ID: {order.id}</li>
           <li>User email: {order.userEmail}</li>
           <li>Shipping address: {order.shippingAddress}</li>
           </div>
         )
        })}
        </ul>
        </div>)
      }
      else {message = <div>There are no orders associated with this account yet.</div>}
    return message
  }
}

const mapState = ({ user, orderHistory }, ownProps) => ({user, orderHistory})
const mapDispatch = (dispatch, ownProps) => ({

  handleFetchOrderHistory() {
    dispatch(fetchOrderHistory(+ownProps.match.params.userId))
  }
})
export default connect(mapState, mapDispatch)(OrderHistory)
