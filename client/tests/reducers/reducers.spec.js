import { expect } from 'chai'
import { createStore } from 'redux'

import { reducer } from '../../store/'

describe('Reducer', () => {
  let testStore
  beforeEach('create new mock store', () => {
    testStore = createStore(reducer)
  })

  it('has proper initial state', () => {
    expect(testStore.getState()).to.be.deep.equal({
      user: {},
      products: [],
      reviews: []
    })
  })

  describe('SET USER', () => {
    it('sets user to user from action', () => {
      testStore.dispatch({
        type: 'GET_USER',
        user: { email: 'someone@gmail.com', isAdmin: false, id: 1 }
      })
      expect(testStore.getState()).to.be.deep.equal({
        user: { email: 'someone@gmail.com', isAdmin: false, id: 1 },
        products: [],
        reviews: []
      })
    })
  })
  describe('SET PRODUCTS', () => {
    it('sets products to products from action', () => {
      testStore.dispatch({
        type: 'GET_PRODUCTS',
        products: [{ name: 'product 1' }, { name: 'product 2' }]
      })
      expect(testStore.getState()).to.be.deep.equal({
        user: {},
        products: [{ name: 'product 1' }, { name: 'product 2' }],
        reviews: []
      })
    })
  })
  describe('SET REVIEWS', () => {
    it('sets user to user from action', () => {
      testStore.dispatch({
        type: 'GOT_PRODUCT_REVIEWS',
        reviews: [{ title: '1st review' }, { title: '2nd review' }]
      })
      expect(testStore.getState()).to.be.deep.equal({
        user: {},
        products: [],
        reviews: [{ title: '1st review' }, { title: '2nd review' }]
      })
    })
  })
})
