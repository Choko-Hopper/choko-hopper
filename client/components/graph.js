import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchLineItems } from '../store'
import {Bar} from 'react-chartjs-2';

class Graph extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchLineItems()
    console.log('sent off fetch for LineItems')
  }


  render() {

    let data = {
      labels: [],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: []
        }
      ]
    };

    const isLoggedIn = !!this.props.user.id
    let graphData = []
    let message;
    if (this.props.lineItems && !this.props.lineItems.length) {
      return <div>No lineItems just yet...</div>
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
      return (
        <div>
      <h2>Products Purchased</h2>
      <Bar
        data={
          {
            labels: graphData.map(obj => obj.productId),
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: graphData.map(obj => obj.quantity)
              }
            ]
          }
        }
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false
        }}
      />
      </div>)
    }
    console.log("graphData array", graphData)







    return message
  }
}

const mapState = ({ user, products, lineItems }, ownProps) => ({user, products, lineItems})
const mapDispatch = (dispatch, ownProps) => ({

  handleFetchLineItems() {
    console.log('About to dispatch fetchLineItems fn')
    dispatch(fetchLineItems())
  }
})
export default connect(mapState, mapDispatch)(Graph)
