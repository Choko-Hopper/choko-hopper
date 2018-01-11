import React from "react"
import { connect } from "react-redux"
import {withRouter, Link} from 'react-router-dom'
import {deleteProductThunk} from '../store'

const SingleProduct = props => {
  const product = props.products.find(
    arrProduct => +arrProduct.id === +props.match.params.productId
  ) || {}
  console.log('ownProps', props.ownProps)
  return (
    <div>
      <div><img src={product.imageUrl} /></div>
      <h2>{product.name}</h2>
      <h4>{product.price}</h4>
      <p>{product.description}</p>
      { props.user && props.user.isAdmin &&
        <div>
              <button id={product.id} onClick={props.handleClick}>X</button>
              <Link to={`/edit-product/${product.id}`}><button id={product.id} >Edit</button></Link>
              </div>
      }
    </div>
  )
}


const mapState = ({ products, user }) => ({ products, user })
const mapDispatch = (dispatch, ownProps) => ({
  handleClick (evt) {
    evt.preventDefault()
    const productId = evt.target.id
    dispatch(deleteProductThunk(productId, ownProps.history))
  }
})
export default connect(mapState, mapDispatch)(SingleProduct)
