import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReviewForm from './review-form'
import { fetchOrderHistory } from '../store'
import UpdateCart  from './update-cart'

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderHistory: []
  }
  this.setLocalOrderHistory = this.setLocalOrderHistory.bind(this)
  }

  componentDidMount() {
    this.props.thunkDispatcher(fetchOrderHistory(this.setLocalOrderHistory, this.props.user.id))
  }

  setLocalOrderHistory(orderHistory) {
    this.setState({orderHistory})
  }

  render() {

    const isLoggedIn = !!this.props.user.id
    return (
    <div>
    { isLoggedIn && this.state.orderHistory.length &&
      <div>
      <h1>My Order History</h1>
      <div className="col-9">
        <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Shipping Address</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
            {
              this.state.orderHistory.map(order => {
                return (
                  <tr key={order.id} className="line-item" >
                    <th scope="row" className="line-item-img col-2">
                    </th>
                    <td className="col-1">${order.id}</td>
                    <td className="col-1">${order.userEmail}</td>
                    <td className="col-1">${order.shippingAddress}</td>
                  </tr>
                )
              })
            }
        </tbody>
        </table>
      </div>
      <div className="col-3">
      </div>
    </div>
    }
    </div>
    )
  }
}

const mapState = ({ products, user, reviews }, ownProps) => ({user})
const mapDispatch = (dispatch, ownProps) => ({
  thunkDispatcher(thunk) {
   dispatch(thunk)
  }
})
export default connect(mapState, null)(OrderHistory)
