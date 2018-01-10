import React from "react"
import { connect } from "react-redux"

const SingleProduct = props => {
  const product = props.products.find(
    arrProduct => +arrProduct.id === +props.match.params.productId
  ) || {}
  return (
    <div>
      <div><img src={product.imageUrl} /></div>
      <h2>{product.name}</h2>
      <h4>{product.price}</h4>
      <p>{product.description}</p>
    </div>
  )
}

const mapState = ({ products }) => ({ products })
const mapDispatch = null
export default connect(mapState, mapDispatch)(SingleProduct)
