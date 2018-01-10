import React from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store'

/**
 * COMPONENT
 */
const NewProductForm = (props) => {
console.log('Here is props.currentUser.isAdmin', props.currentUser.isAdmin)
  return (

    <div>
    { props.currentUser && !props.currentUser.isAdmin ?
      <h3>Sorry, you don't have access to this page.</h3> :


      <form onSubmit={props.handleSubmit} name="newProductForm">
        <div>
          <label htmlFor="name"><small>Product Name</small></label>
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
    }
    </div>
  )
}

const mapState = (state) => {
  return {

    currentUser: state.user
  }
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

      dispatch(addProductThunk(newProduct))
    }
  }
}

export default connect(mapState, mapDispatch)(NewProductForm)
