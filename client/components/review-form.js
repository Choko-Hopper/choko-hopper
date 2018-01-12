import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postProductReview } from '../store'

const ReviewForm = props => (
  <form id="reviewForm" onSubmit={props.handleSubmit}>
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
    <div>
      <label>Title: </label>
      <input type="text" name="title" />
    </div>
    <textarea placeholder="Leave a Review..." name="text" />
    <div id="reviewSubmit">
      <button type="submit">Submit</button>
    </div>
  </form>
)

const mapState = null
const mapDispatch = (dispatch, ownProps) => ({
    handleSubmit(evt) {
    evt.preventDefault()
    const { productId } = ownProps.match.params
    const review = {
      rating: evt.target.rating.value,
      title: evt.target.title.value,
      text: evt.target.text.value
    }
    dispatch(postProductReview(review, productId))
  }
})

export default withRouter(connect(mapState, mapDispatch)(ReviewForm))
