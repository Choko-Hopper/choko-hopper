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
    return (
    <div>
    {!isLoggedIn &&
    <div>
    You must be a registered User to see your Order History.
    </div>
    }
    { isLoggedIn && this.props.orderHistory && !this.props.orderHistory.length &&
      <div>
      There are currently no order in your Order History.
      </div>
    }
    { isLoggedIn && this.props.orderHistory && this.props.orderHistory.length &&
      <div>
      {this.props.orderHistory}
    </div>
    }
    </div>
    )
  }
}

const mapState = ({ products, user, reviews, orderHistory }, ownProps) => ({user})
const mapDispatch = (dispatch, ownProps) => ({

  handleFetchOrderHistory() {
    dispatch(fetchOrderHistory(+ownProps.match.params.userId))
  }
})
export default connect(mapState, mapDispatch)(OrderHistory)
