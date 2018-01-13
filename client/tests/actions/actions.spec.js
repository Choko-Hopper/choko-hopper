import { expect } from 'chai'
import {
  getUser,
  removeUser,
  getProducts,
  removeProduct,
  addProduct,
  updateProduct,
  gotProductReviews,
  postedReview
} from '../../store'

describe('Actions', () => {
  describe('User Actions', () => {
    describe('getUser', () => {
      it('returns GET_USER action', () => {
        const testUser = {
          email: 'test@test.com',
          isAdmin: true
        }

        expect(getUser(testUser)).to.be.deep.equal({
          type: 'GET_USER',
          user: testUser
        })
      })
      it('returns REMOVE_USER action', () => {
        expect(removeUser()).to.be.deep.equal({
          type: 'REMOVE_USER'
        })
      })
    })
  })
  describe('Product Actions', () => {
    describe('getProducts', () => {
      const testProduct = {
        id: 1,
        imageUrl: 'http://image.com/image.jpg',
        name: 'chocolate',
        price: 5,
        description: 'yummy chocolate mmmmmmmm'
      }
      it('returns GET_PRODUCTS action', () => {
        expect(
          getProducts([testProduct, testProduct, testProduct])
        ).to.be.deep.equal({
          type: 'GET_PRODUCTS',
          products: [testProduct, testProduct, testProduct]
        })
      })
      it('returns ADD_PRODUCT action', () => {
        expect(addProduct(testProduct)).to.be.deep.equal({
          type: 'ADD_PRODUCT',
          product: testProduct
        })
      })
      it('returns UPDATE_PRODUCT action', () => {
        expect(updateProduct(testProduct)).to.be.deep.equal({
          type: 'UPDATE_PRODUCT',
          product: testProduct
        })
      })
      it('returns REMOVE_PRODUCT action', () => {
        expect(removeProduct(1)).to.be.deep.equal({
          type: 'REMOVE_PRODUCT',
          productId: 1
        })
      })
    })
  })
  describe('Review Actions', () => {
    describe('gotProductReviews', () => {
      const review = {
        rating: 5,
        title: 'yummmm',
        text: 'this was the best chocolate ever'
      }
      it('returns GOT_PRODUCT_REVIEWS action', () => {

        expect(gotProductReviews([review, review, review])).to.be.deep.equal({
          type: 'GOT_PRODUCT_REVIEWS',
          reviews: [review, review, review]
        })
      })
      it('returns POSTED_REVIEW action', () => {
        expect(postedReview(review)).to.be.deep.equal({
          type: 'POSTED_REVIEW',
          review
        })
      })
    })
  })
})
