import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {deleteProductThunk} from '../store'
/**
 * COMPONENT
 */
class AllProducts extends Component {

  constructor() {
    super();
    this.state = {
      searchInput: ""
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt){
    let searchInput = evt.target.value
    this.setState({searchInput})
  }


  render() {
    const productsToDisplay = this.props.products.filter((product) => product.name.toLowerCase().match(this.state.searchInput.toLowerCase()))

    return (
      <div>
      <label htmlFor="search">SEARCH</label>
      <form>
      <input
        onChange= {this.handleChange}
        placeholder="Enter Product Name"
      />
    </form>
        {productsToDisplay.map(product => {
          return (
            <div className="col-3" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div>
                  <div><img src={product.imageUrl} /></div>
                  <p className="meta">{product.name}</p>
                  <p className="meta"> ${product.price} </p>
                </div>
              </Link>
              { this.props.currentUser && this.props.currentUser.isAdmin &&
                <div>
                <button id={product.id} onClick={this.props.handleClick}>X</button>
                <Link to={`/edit-product/${product.id}`}><button id={product.id} >Edit</button></Link>
                </div>
              }
            </div>
          )
        })}
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
