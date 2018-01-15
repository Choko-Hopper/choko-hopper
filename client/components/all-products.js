import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { deleteProductThunk } from '../store'
import UpdateCart from './update-cart'

/**
 * COMPONENT
 */
class AllProducts extends Component {

  constructor() {
    super();
    this.state = {
      searchInput: '',
      category: 0
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleChange(evt) {
    let searchInput = evt.target.value
    this.setState({ searchInput })
  }

  handleCategory(evt) {
    let category = +evt.target.value
    this.setState({ category })
  }

  handleReset(evt) {
    this.setState({ searchInput: '', category: 0 })

  }

  render() {
    let productsToDisplay = this.props.products.filter((product) => product.name.toLowerCase().match(this.state.searchInput.toLowerCase()))
    if (this.state.category) { productsToDisplay = productsToDisplay.filter((product) => product.categoryId === this.state.category) }
    console.log(this.props)
    return (
      <div className="container">
        <label htmlFor="search"><small>Search By Name</small></label>
        <form  >
          <input
            value={this.state.searchInput}
            onChange={this.handleChange}
            placeholder="Enter Product Name"
          />
        </form>

        <div>
          <select name="category" value={this.state.category} onChange={this.handleCategory} ref='category'>
            <option value="0" >All Categories</option>
            <option value="1" >Milk chocolate</option>
            <option value="2" >Dark chocolate</option>
            <option value="3" >White chocolate</option>
          </select>
        </div>

        <div>
          <button id="reset" onClick={this.handleReset}>Reset</button>
        </div>

        <div className="row align-items-center">
          {productsToDisplay.map(product => {
            let itemInCart = this.props.cart.find(lineItem => +lineItem.productId === product.id)
            let quantity
            if (itemInCart) quantity = itemInCart.quantity
            return (
              <div className="product-card col-3" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div>
                    <div><img src={product.imageUrl} /></div>
                    <div className="meta">
                      <p>{product.name}</p>
                      <p> ${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
                <div className="quantity d-flex justify-content-center">
                  <UpdateCart product={product} quantity={quantity} />
                </div>
                {this.props.currentUser && this.props.currentUser.isAdmin &&
                  <div>
                    <button id={product.id} onClick={this.props.handleClick}>X</button>
                    <Link to={`/edit-product/${product.id}`}><button id={product.id} >Edit</button></Link>
                  </div>
                }
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products,
    currentUser: state.user,
    cart: state.cart.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(evt) {
      evt.preventDefault()
      const productId = evt.target.id
      dispatch(deleteProductThunk(productId))
    }
  }
}


export default connect(mapState, mapDispatch)(AllProducts)
