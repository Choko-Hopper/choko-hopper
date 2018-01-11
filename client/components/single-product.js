import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductThunk } from '../store'
import axios from 'axios'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
  }

  componentDidMount() {
    const { productId } = this.props.match.params
    axios
      .get(`/api/reviews/${productId}`)
      .then(res => res.data)
      .then(reviews => this.setState({ reviews }))
      .catch(err => console.error(err))
  }
  render() {
    const product =
      this.props.products.find(
        arrProduct => +arrProduct.id === +this.props.match.params.productId
      ) || {}
    return (
      <div>
        <div>
          <img src={product.imageUrl} />
        </div>
        <h2>{product.name}</h2>
        <h4>{product.price}</h4>
        <p>{product.description}</p>
        {this.props.user &&
          this.props.user.isAdmin && (
            <div>
              <button id={product.id} onClick={this.props.handleClick}>
                X
              </button>
              <Link to={`/edit-product/${product.id}`}>
                <button id={product.id}>Edit</button>
              </Link>
            </div>
          )}
        <form>
          <div id="reviewRadios">
            <label>Rating: </label>
            <input type="radio" id="1" value="1" name="rating" />
            <label htmlFor="1">1</label>
            <input type="radio" id="2" value="2" name="rating" />
            <label htmlFor="2">2</label>
            <input type="radio" id="3" value="3" name="rating" />
            <label htmlFor="3">3</label>
            <input type="radio" id="4" value="4" name="rating" />
            <label htmlFor="4">4</label>
            <input type="radio" id="5" value="5" name="rating" />
            <label htmlFor="5">5</label>
          </div>
          <input type="text" name="title" />
          <textarea placeholder="Leave a Review..." />
          <button type="submit">Submit</button>
        </form>
        {this.state.reviews.map(review => (
          <div key={review.id}>
            <h4>{review.title}</h4>
            <h5>Rating: {review.rating}</h5>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = ({ products, user }) => ({ products, user })
const mapDispatch = (dispatch, ownProps) => ({
  handleClick(evt) {
    evt.preventDefault()
    const productId = evt.target.id
    dispatch(deleteProductThunk(productId, ownProps.history))
  }
})
export default connect(mapState, mapDispatch)(SingleProduct)
