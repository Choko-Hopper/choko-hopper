import React from 'react'
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

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
    products: state.products
  }
}

export default connect(mapState)(AllProducts)
