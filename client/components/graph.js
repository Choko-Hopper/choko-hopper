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
  }

  render() {

    const isLoggedIn = !!this.props.user.id


    if (this.props.lineItems && !this.props.lineItems.length) {
      return <div>No lineItems just yet...</div>
    }
    else if (isLoggedIn && this.props.lineItems && this.props.lineItems.length && this.props.products && this.props.products.length) {
      let graphData = []
      this.props.lineItems.forEach(lineItem => {

        let productName = this.props.products.find(product => {
          return +product.id === +lineItem.productId
        }).name

        let index = graphData.findIndex(item => {
          return item.product === productName
        })
        if (index === -1) {
          graphData.push({
            product: productName,
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
                labels: [...graphData.map(obj => obj.product), ''],
                datasets: [
                  {
                    label: '# of units sold',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [...graphData.map(obj => obj.quantity), 0]
                  }
                ]
              }
            }
            width={100}
            height={50}
            options={{
              maintainAspectRatio: true
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
    dispatch(fetchLineItems())
  }
})
export default connect(mapState, mapDispatch)(Graph)
