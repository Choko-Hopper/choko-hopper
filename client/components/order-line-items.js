import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

function OrderLineItems(props) {

let lineItemTable = props.cart.map(cartItem => {
    let singleProduct = props.products.find((product) => +product.id === +cartItem.productId)
    let itemTotal = cartItem.unitPrice * cartItem.quantity
    orderSubtotal += itemTotal
    orderTotal = orderSubtotal - discount

    return (
      singleProduct &&
      <tr key={cartItem.productId} className="line-item" >
        <th scope="row" className="line-item-img col-2">
          <Link to={`/products/${cartItem.productId}`} >
            <img src={singleProduct.imageUrl} />
          </Link>
        </th>
        <td className="col-5">{singleProduct.name}</td>
        <td className="col-1">${cartItem.unitPrice.toFixed(2)}</td>
        <td className="col-1">${itemTotal.toFixed(2)}</td>
        <td className="col-1"><button type="button" className="deleteButton btn btn-link fa fa-times" value={cartItem.productId} onClick={props.handleClick} /></td>
      </tr>
    )
  })
}

  /**
 * CONTAINER
 */
const mapState = (state) => {
    return {
      products: state.products,
      currentUser: state.user,
      cart: state.cart.cart
    }
  }
  
  const mapDispatch = (dispatch) => {
    return {
      handleClick(evt) {
        evt.preventDefault()
        const productId = evt.target.id
        dispatch(deleteProductThunk(productId))
      }
    }
  }
  
  
  export default connect(mapState, mapDispatch)(AllProducts)