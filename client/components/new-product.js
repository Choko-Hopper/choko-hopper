import React from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store'

/**
 * COMPONENT
 */
const NewProductForm = (props) => {
console.log("Inside NewProductForm component!")
  return (
    <div>
      <form onSubmit={props.handleSubmit} name="newProductForm">
        <div>
          <label htmlFor="productName"><small>Product Name</small></label>
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="imageUrl"><small>imageUrl</small></label>
          <input name="imageUrl" type="text" />
        </div>
        <div>
          <label htmlFor="price"><small>Price</small></label>
          <input name="price" type="text" />
        </div>
        <div>
          <label htmlFor="description"><small>Description</small></label>
          <input name="description" type="text" />
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
  )
}


const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const newProduct = {
        name: evt.target.name.value,
        imageUrl: evt.target.imageUrl.value,
        price: evt.target.price.value,
        description: evt.target.description.value,
        isInStock: evt.target.isInStock.value
      }
      //Dispatch thunk that will send axios request
      dispatch(addProductThunk(newProduct))
    }
  }
}

export default connect(null, mapDispatch)(NewProductForm)
