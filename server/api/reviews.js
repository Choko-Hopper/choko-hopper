const router = require('express').Router()
const { Review, User } = require('../db/models')
module.exports = router

router.get('/:productId', (req, res, next) => {
  const { productId } = req.params
  Review.findAll({ where: { productId }, order: [['createdAt', 'DESC']] })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.post('/:productId', (req, res, next) => {
  const { productId } = req.params
  const { rating, title, text } = req.body
  if (req.user) {
    const userId = req.user.id || null
    Review.create({ productId, rating, title, text, userId })
      .then(review => res.status(201).json(review))
      .catch(next)
  } else {
    const err = new Error('Must be logged in to review')
    err.status = 401
    next(err)
  }
})

router.put('/:reviewId', (req, res, next) => {
  const { reviewId } = req.params
  const { rating, title, text } = req.body
  Review.findById(reviewId)
    .then(review => {
      if (req.user && req.user.id === review.userId) {
        return review.update({ rating, title, text })
      } else {
        const err = new Error('Must be logged in correct user to update')
        err.status = 401
        next(err)
      }
    })
    .then(updatedReview => res.status(201).json(updatedReview))
    .catch(next)
})

router.delete('/:reviewId', (req, res, next) => {
  const { reviewId } = req.params
  Review.findById(reviewId)
    .then(review => {
      if (req.user && req.user.id === review.userId) {
        return review.destroy()
      } else {
        const err = new Error('Must be logged in correct user to delete')
        err.status = 401
        next(err)
      }
    })
    .then(() => res.status(204).json())
    .catch(next)
})
