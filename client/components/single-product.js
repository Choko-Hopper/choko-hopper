import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReviewForm from './review-form'
import { deleteProductThunk, fetchProductReviews } from '../store'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.reviews = []
  }

  componentDidMount() {
    const reviews = this.props.reviews.filter(
      arrReview => +arrReview.productId === +this.props.match.params.productId
    )
    if (reviews.length) this.reviews = reviews
    else this.props.handleFetchReviews()
  }

  render() {
    const product =
      this.props.products.find(
        arrProduct => +arrProduct.id === +this.props.match.params.productId
      ) || {}

    const reviews = this.reviews.length ? this.reviews : this.props.reviews

    const isLoggedIn = !!this.props.user.id
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
        {isLoggedIn && <ReviewForm />}
        {reviews.map(review => (
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

const mapState = ({ products, user, reviews }) => ({ products, user, reviews })
const mapDispatch = (dispatch, ownProps) => ({
  handleClick(evt) {
    evt.preventDefault()
    const productId = evt.target.id
    dispatch(deleteProductThunk(productId, ownProps.history))
  },
  handleFetchReviews() {
    dispatch(fetchProductReviews(ownProps.match.params.productId))
  }
})
export default connect(mapState, mapDispatch)(SingleProduct)
