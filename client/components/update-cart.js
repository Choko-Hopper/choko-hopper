import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'
import {updateCart} from '../store'

class UpdateCart extends Component {
    constructor(props){
        super()
        const { product } = props
        this.state = {
            productId: product.id,
            quantity: '0',
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
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group col-6">
                    <input onChange={this.handleChange} value={this.state.quantity} type="number" step="1" name="quantity" className="form-control" />
                </div>
                <div className="form-group col-6">
                    <button type="submit" className="btn btn-default">Add To Cart</button>
                </div>
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
