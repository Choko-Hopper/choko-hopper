import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addOrEditProductThunk } from '../store'

/**
 * COMPONENT
 */
class ProductForm extends Component {
  constructor(props) {
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

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  componentDidMount() {
    this.setLocalState()
  }

  setLocalState() {
    this.setState((prevState, props) => this.props.product)
  }

  render() {
    const product = this.props.product
    return (
      <div>
        {this.props.currentUser && !this.props.currentUser.isAdmin ? (
          <h3>Sorry, you don't have access to this page.</h3>
        ) : (
          <div>
            <h3>
              {this.props.formTitle} {product.name || ''}
            </h3>
            <form
              onSubmit={evt => {
                const productId = this.props.product.id
                  ? +this.props.product.id
                  : null
                this.props.handleSubmit(evt, this.state, productId)
                this.setState({
                  name: '',
                  imageUrl: '',
                  price: '',
                  description: '',
                  quantity: '0'
                })
              }}
              name="newProductForm"
            >
              <div>
                <label htmlFor="name">
                  <small>Product Name</small>
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.name}
                  name="name"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="imageUrl">
                  <small>imageUrl</small>
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.imageUrl}
                  name="imageUrl"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="price">
                  <small>Price</small>
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.price}
                  name="price"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="description">
                  <small>Description</small>
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.description}
                  name="description"
                  type="text"
                />
              </div>

              <div>
                <select name="category">
                  <option value="0">Choose a category</option>
                  {this.props.categories.map(category => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div>
                <div>
                  <label htmlFor="quantity">
                    <small>Quantity</small>
                  </label>
                  <input name="quantity" type="text" />
                </div>
              </div>
              <div>
                <button type="submit">Save New Product</button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapNewProduct = state => {
  return {
    products: [],
    name: 'newProduct',
    formTitle: 'Create A New Product',
    currentUser: state.user,
    categories: state.allCategories
  }
}

const mapEditProduct = state => {
  return {
    products: state.products,
    name: 'editProduct',
    formTitle: 'Edit Product',
    currentUser: state.user,
    categories: state.allCategories
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(evt, state, productId) {
    evt.preventDefault()
    dispatch(addOrEditProductThunk(state, productId))
  }
})

export const NewProductForm = connect(mapNewProduct, mapDispatch)(ProductForm)
export const EditProductForm = connect(mapEditProduct, mapDispatch)(ProductForm)
