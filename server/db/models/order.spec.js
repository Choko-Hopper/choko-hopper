/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('model definition', () => {
      let fakeOrder;

      beforeEach(() => {
        return Order.create({
          userEmail: 'cody@puppybook.com',
          shippingAddress: '10 Doggo Lane, Barktown, Pupperville, 10000',
          status: 'Created'
        })
          .then(order => {
            fakeOrder = order
          })
      })
      describe('attributes definition', function(){

      it('has `userEmail` field that is a string', () => {
        expect(fakeOrder.userEmail).to.equal('cody@puppybook.com')
        expect(fakeOrder.userEmail).to.be.a('string')
      })

      it('requires `userEmail` field', function () {

        fakeOrder.userEmail = null;

        return fakeOrder.validate()
          .then(function () {
            throw new Error('userEmail cannot be null!');
          },
          function (result) {
            expect(result).to.be.an.instanceOf(Error);
          });

      });

      it('has `shippingAddress` field that is a string', () => {
        expect(fakeOrder.shippingAddress).to.be.a('string')
        expect(fakeOrder.shippingAddress).to.equal('10 Doggo Lane, Barktown, Pupperville, 10000')
      })



  }) // end describe(attributes and options definition')
}) // end describe('User model')
})
