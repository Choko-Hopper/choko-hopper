import React from 'react'
import {connect} from 'react-redux'
import {addOrEditProductThunk} from '../store'

/**
 * COMPONENT
 */
const ProductForm = (props) => {

const product = props.products.find(
  arrProduct => +arrProduct.id === +props.match.params.productId
) || {}
  return (

    <div>
    { props.currentUser && !props.currentUser.isAdmin ?
      <h3>Sorry, you don't have access to this page.</h3> :
    <div>
      <h3>{props.formTitle} {product.name || ''}</h3>
      <form onSubmit={props.handleSubmit} name="newProductForm">
        <div>
          <label htmlFor="name"><small>Product Name</small></label>
          <input name="name" type="text" placeholder={product.name} />
        </div>
        <div>
          <label htmlFor="imageUrl"><small>imageUrl</small></label>
          <input name="imageUrl" type="text" placeholder={product.imageUrl} />
        </div>
        <div>
          <label htmlFor="price"><small>Price</small></label>
          <input name="price" type="text" placeholder={product.price * 100} />
        </div>
        <div>
          <label htmlFor="description"><small>Description</small></label>
          <input name="description" type="text" placeholder={product.description} />
        </div>
        <div>
        <label htmlFor="description"><small>Is this product in stock?</small></label>
        <select className="form-control" name="isInStock">
        <option value ="yes" >YES</option>
        <option value ="no" >NO</option>
      </select>
      </div>
        <div>
          <button type="submit">Save New Product</button>
        </div>
      </form>
      </div>
    }
    </div>
  )
}

const mapNewProduct = (state) => {
  return {
    products: [],
    name: 'newProduct',
    formTitle: 'Create A New Product',
    currentUser: state.user
  }
}

const mapEditProduct = (state) => {
  return {
    products: state.products,
    name: 'editProduct',
    formTitle: 'Edit Product',
    currentUser: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const productId = ownProps.match.params.productId ? +ownProps.match.params.productId : null
      const imageUrl = evt.target.imageUrl.value === '' ? "https://www.thechocolatetherapist.com/wp-content/themes/blankspace-child/images/header-chocolate-shavings.jpg" : evt.target.imageUrl.value
      const product = {
        name: evt.target.name.value,
        imageUrl: imageUrl,
        price: evt.target.price.value * 100,
        description: evt.target.description.value,
        isInStock: evt.target.isInStock.value
      }

      dispatch(addOrEditProductThunk(product, productId))
    }
  }
}

export const NewProductForm = connect(mapNewProduct, mapDispatch)(ProductForm)
export const EditProductForm = connect(mapEditProduct, mapDispatch)(ProductForm)
