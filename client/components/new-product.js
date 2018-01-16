
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addOrEditProductThunk } from '../store'

/**
 * COMPONENT
 */
class ProductForm extends Component {
  constructor(props){
    super(props)
    console.log('loooooooooook', props)
    this.state = {
      name: '',
      imageUrl: '',
      price: '',
      description: '',
      quantity: 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt){
    this.setState({ [evt.target.name]: evt.target.value })
  }

  componentDidMount(){
        this.setLocalState()
  }

  setLocalState(){
    this.setState((prevState, props) => this.props.product);
  }

  render() {
    const product = this.props.product
    return (
      <div>
        {this.props.currentUser && !this.props.currentUser.isAdmin ?
          <h3>Sorry, you don't have access to this page.</h3> :
          <div>
            <h3>{this.props.formTitle} {product.name || ''}</h3>
            <form onSubmit={this.props.handleSubmit} name="newProductForm">
              <div>
                <label htmlFor="name"><small>Product Name</small></label>
                <input onChange={this.handleChange} value={this.state.name} name="name" type="text" />
              </div>
              <div>
                <label htmlFor="imageUrl"><small>imageUrl</small></label>
                <input onChange={this.handleChange} value={this.state.imageUrl} name="imageUrl" type="text" />
              </div>
              <div>
                <label htmlFor="price"><small>Price</small></label>
                <input onChange={this.handleChange} value={this.state.price} name="price" type="text" />
              </div>
              <div>
                <label htmlFor="description"><small>Description</small></label>
                <input onChange={this.handleChange} value={this.state.description} name="description" type="text" />
              </div>
  
              <div>
                <select name= "category">
                <option value="0">Choose a category</option>
                {this.props.categories.map(category => {
                  return <option key={category.id} value={category.id}>{category.name}</option>
                })}
                </select>
              </div>
  
              <div>
                <div>
                  <label htmlFor="quantity"><small>Quantity</small></label>
                  <input name="quantity" type="text" />
                </div>
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

}

const mapNewProduct = (state) => {
  return {
    products: [],
    name: 'newProduct',
    formTitle: 'Create A New Product',
    currentUser: state.user,
    categories: state.allCategories
  }
}

const mapEditProduct = (state) => {
  return {
    products: state.products,
    name: 'editProduct',
    formTitle: 'Edit Product',
    currentUser: state.user,
    categories: state.allCategories
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const productId = ownProps.match.params.productId ? +ownProps.match.params.productId : null
      const imageUrl = evt.target.imageUrl.value === '' ? "https://www.thechocolatetherapist.com/wp-content/themes/blankspace-child/images/header-chocolate-shavings.jpg" : evt.target.imageUrl.value
      const product = {
        name: evt.target.name.value,
        imageUrl: imageUrl,
        price: evt.target.price.value * 100,
        description: evt.target.description.value,
        quantity: evt.target.quantity.value,
        categoryId: evt.target.category.value
      }

      dispatch(addOrEditProductThunk(product, productId))
      evt.target.name.value = ''
      evt.target.imageUrl.value = ''
      evt.target.price.value = ''
      evt.target.description.value = ''
      evt.target.quantity.value = '0'
      evt.target.category.value = '0'
    }
  }
}

export const NewProductForm = connect(mapNewProduct, mapDispatch)(ProductForm)
export const EditProductForm = connect(mapEditProduct, mapDispatch)(ProductForm)
