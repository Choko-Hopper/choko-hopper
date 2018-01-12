import React from 'react'
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {deleteProductThunk} from '../store'
import AddToCart  from './add-to-cart'

/**
 * COMPONENT
 */
export const AllProducts = (props) => {
  const { products } = props
  return (
    <div>
      {products.map(product => {
        return (
          <div className="col-3" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div>
                <div><img src={product.imageUrl} /></div>
                <p className="meta">{product.name}</p>
                <p className="meta"> ${product.price} </p>
              </div>
            </Link>
            { props.currentUser && props.currentUser.isAdmin &&
              <div>
              <button id={product.id} onClick={props.handleClick}>X</button>
              <Link to={`/edit-product/${product.id}`}><button id={product.id} >Edit</button></Link>
              <AddToCart product={product} />
              </div>
            }
          </div>
        )
      })}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products,
    currentUser: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick (evt) {
      evt.preventDefault()
      const productId = evt.target.id
      dispatch(deleteProductThunk(productId))
    }
  }
}


export default connect(mapState, mapDispatch)(AllProducts)
