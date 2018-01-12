import axios from 'axios'
//ACTION TYPES
const GOT_PRODUCT_REVIEWS = 'GOT_PRODUCT_REVIEWS'
const POSTED_REVIEW = 'POSTED_REVIEW'

//ACTION CREATORS
const gotProductReviews = reviews => ({ type: GOT_PRODUCT_REVIEWS, reviews })
const postedReview = review => ({ type: POSTED_REVIEW, review })

//THUNK CREATOR
export const fetchProductReviews = productId => dispatch => {
  axios
    .get(`/api/reviews/${productId}`)
    .then(res => dispatch(gotProductReviews(res.data)))
    .catch(err => console.error(err))
}

export const postProductReview = (review, productId) => dispatch => {
  axios
    .post(`/api/reviews/${productId}`, review)
    .then(res => dispatch(postedReview(res.data)))
    .catch(err => console.error(err))
}

//SUBREDUCER
export default function(reviews = [], action) {
  switch (action.type) {
    case GOT_PRODUCT_REVIEWS:
      return [...action.reviews, ...reviews]
    case POSTED_REVIEW:
      return [action.review, ...reviews]
    default:
      return reviews
  }
}

