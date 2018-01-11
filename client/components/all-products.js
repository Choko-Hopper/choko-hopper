import React from 'react'
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {deleteProductThunk} from '../store'
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
              <button id={product.id} onClick={props.handleClick}>X</button>
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
