import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'

import {ReviewForm} from '../../components/'

describe('ReviewForm', () => {
  let reviewForm
  beforeEach('create component', () => {
    reviewForm = shallow(<ReviewForm />)
    console.dir(reviewForm.find('form'))
  })
  it('should be a <form>', () => {
    expect(reviewForm.contains('form')).to.equal(true)
  })
})
