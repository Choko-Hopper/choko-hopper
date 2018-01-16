import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchLineItems } from '../store'
import { Bar } from 'react-chartjs-2';

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

    if (this.props.lineItems && !this.props.lineItems.length) {
      return <div>No lineItems just yet...</div>
    }
    else if (isLoggedIn && this.props.lineItems && this.props.lineItems.length && this.props.products && this.props.products.length) {
      this.props.lineItems.forEach(lineItem => {
        let index = graphData.findIndex(item => {
          return item.productId === lineItem.productId
        })
        let relevantProd = this.props.products.find(product => {
          return product.id === lineItem.productId
        }).name
        if (index === -1) {
          graphData.push({
            product: relevantProd,
            quantity: lineItem.quantity
          })
        } else {
          graphData[index].quantity += lineItem.quantity
        }
      })
      return (
        <div>
          <h2>Products Purchased</h2>
          <Bar
            data={
              {
                labels: graphData.map(obj => obj.product), //[1,2,3]
                datasets: [
                  {
                    label: '# of units sold',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: graphData.map(obj => obj.quantity) //[10,1,2]
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
    } else {
      return <div>NOPE</div>
    }

  }
}

const mapState = ({ user, products, lineItems }, ownProps) => ({ user, products, lineItems })
const mapDispatch = (dispatch, ownProps) => ({

  handleFetchLineItems() {
    console.log('About to dispatch fetchLineItems fn')
    dispatch(fetchLineItems())
  }
})
export default connect(mapState, mapDispatch)(Graph)
