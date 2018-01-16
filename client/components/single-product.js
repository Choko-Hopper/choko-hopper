import React, { Component } from 'react'
import ReactStars from 'react-stars'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReviewForm from './review-form'
import { deleteProductThunk, fetchProductReviews } from '../store'
import UpdateCart  from './update-cart'

class SingleProduct extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.reviews.length) this.props.handleFetchReviews()
  }

  render() {
    const product = this.props.product || {price: 0}
    const reviews = this.props.reviews || []

    const isLoggedIn = !!this.props.user.id
    return (
      <div>
        <div>
          <img src={product.imageUrl} />
        </div>
        <h2>{product.name}</h2>
        <h4>${product.price.toFixed(2)}</h4>
        <p>{product.description}</p>

        { product.quantity === 0 ? <div className="alert" >Out Of Stock</div> : <UpdateCart product={product} />}

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
            <ReactStars count={5} size={20} value={review.rating} edit={false} />
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = ({ products, user, reviews }, ownProps) => ({
  product: products.find(
        arrProduct => +arrProduct.id === +ownProps.match.params.productId
      ),
  user,
  reviews: reviews.filter(
      arrReview => +arrReview.productId === +ownProps.match.params.productId
    )
})
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
