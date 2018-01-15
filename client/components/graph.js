import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchLineItems } from '../store'

class Graph extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchLineItems()
    console.log('sent off fetch for LineItems')
  }


  render() {
    const isLoggedIn = !!this.props.user.id
    let graphData = []
    let message;
    if (this.props.lineItems && !this.props.lineItems.length) {
      message = <div>No lineItems just yet...</div>
    }
    else if (this.props.lineItems && this.props.lineItems.length) {
      //Iterate through array of lineItems
      this.props.lineItems.forEach(lineItem => {
        let index = graphData.findIndex(item => {
          return item.productId === lineItem.productId
        })
        //If there is already an object in graphData with that productId, then increment the quantity. If not, add the object
        if (index === -1) {graphData.push({
          productId: lineItem.productId,
          quantity: lineItem.quantity
        })} else {
          graphData[index].quantity += lineItem.quantity
        }
      })
      message = <div>Have graph data all set</div>
    }
    console.log("graphData array", graphData)
    return message
  }
}

const mapState = ({ user, lineItems }, ownProps) => ({user, lineItems})
const mapDispatch = (dispatch, ownProps) => ({

  handleFetchLineItems() {
    console.log('About to dispatch fetchLineItems fn')
    dispatch(fetchLineItems())
  }
})
export default connect(mapState, mapDispatch)(Graph)
