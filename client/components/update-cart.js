import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {updateCart} from '../store'

class UpdateCart extends Component {
    constructor(props){
        super()
        const { product } = props
        this.state = {
            productId: product.id,
            quantity: props.quantity ? props.quantity : '0',
            unitPrice: product.price,
        }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (evt) {
        this.setState({ quantity: evt.target.value })
    }

    handleSubmit (evt) {
      evt.preventDefault()
      this.props.runThunk(this.state)
  }

    render(){
        const icon = !this.props.quantity ? 'Add To Cart' : <i className="fa fa-refresh" aria-hidden="true" />
        return (
            <form className="update-quantity form-inline" onSubmit={this.handleSubmit}>
                <label className="sr-only" htmlFor="quantity">Quantity</label>
                <input onChange={this.handleChange} value={this.state.quantity} type="number" step="1" name="quantity" className="form-control" />
                <button type="submit" className="btn btn-default">{icon}</button>
            </form>
        )
    }
}

const mapDispatch = (dispatch) => {
  return {
    runThunk (updatedItem) {
      dispatch(updateCart(updatedItem))
    }
  }
}

export default connect(null, mapDispatch)(UpdateCart)
