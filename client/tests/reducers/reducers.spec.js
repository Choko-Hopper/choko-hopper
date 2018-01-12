import { expect } from 'chai'
import { createStore } from 'redux'

import reducer from '../../store/'

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

  describe('SET FIRST COLOR', () => {
    it('sets first color to color from action', () => {
      testStore.dispatch({ type: 'SET_FIRST_COLOR', color: [13, 13, 13] })
      expect(testStore.getState()).to.be.deep.equal({
        firstColor: [13, 13, 13],
        secondColor: [0, 0, 0],
        thirdColor: [0, 0, 0]
      })
    })
  })
})
