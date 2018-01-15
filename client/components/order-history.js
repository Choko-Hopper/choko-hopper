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
        (
           <table className="table">
           <thead className="thead-dark">
             <tr>
               <th scope="col">Order ID</th>
               <th scope="col">Date</th>
               <th scope="col">Shipping Address</th>
               <th scope="col">Status</th>
             </tr>
           </thead>
           <tbody>
           {this.props.orderHistory && this.props.orderHistory.map(order => {
             return (
              <tr key={order.id} className="line-item" >
              <th scope="row" className="col-2">
                <Link to={`/order-history/${this.props.user.id}/${order.id}`} >
                  # {order.id}
                </Link>
              </th>
              <td className="col-1">{order.createdAt.slice(0, 10)}</td>
              <td className="col-5">{order.shippingAddress}</td>
              <td className="col-1">{order.status}</td>
            </tr>
             )
           })}
           </tbody>
         </table>
        )
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
