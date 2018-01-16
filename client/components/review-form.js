import React, { Component } from 'react'
import ReactStars from 'react-stars'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postProductReview } from '../store'

class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      title: '',
      text: ''
    }
    this.handleRating = this.handleRating.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleRating(rating) {
    this.setState({ rating })
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render() {
    const props = this.props
    return (
      <form
        id="reviewForm"
        onSubmit={evt => {
          props.handleSubmit(evt, this.state)
          this.setState({ rating: 0, title: '', text: '' })
        }}
      >
        <div id="reviewRadios">
          <ReactStars
            count={5}
            onChange={this.handleRating}
            value={this.state.rating}
            size={24}
            color2={'#ffd700'}
            half={false}
          />
        </div>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            name="title"
          />
        </div>
        <textarea
          placeholder="Leave a Review..."
          value={this.state.text}
          onChange={this.handleChange}
          name="text"
        />
        <div id="reviewSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

const mapState = null
const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(evt, state) {
    evt.preventDefault()
    const { rating, title, text } = state
    const { productId } = ownProps.match.params
    const review = { rating, title, text }
    dispatch(postProductReview(review, productId))
  }
})

export default withRouter(connect(mapState, mapDispatch)(ReviewForm))
