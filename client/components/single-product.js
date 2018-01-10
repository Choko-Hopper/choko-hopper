import React from "react"
import { connect } from "react-redux"

const SingleProduct = props => {
  const product = props.products.find(
    product => product.id === props.match.params.productId
  )
  return (
    <div>
      <h2>{product.name}</h2>
    </div>
  )
}

const mapState = ({ products }) => ({ products })
const mapDispatch = null
export default connect(mapState, mapDispatch)(SingleProduct)
