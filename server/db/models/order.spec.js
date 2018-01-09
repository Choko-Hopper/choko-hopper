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
          items: [
            {productId: 1, unitPrice: 5, quantity: 3},
            {productId: 2, unitPrice: 2, quantity: 1},
            {productId: 3, unitPrice: 10, quantity: 2}
          ]
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

      it('`userEmail` cannot be an empty string', function () {

        fakeOrder.userEmail = '';

        return fakeOrder.validate()
          .then(function () {
            throw new Error('userEmail cannot be an empty string!');
          },
          function (result) {
            expect(result).to.be.an.instanceOf(Error);
          });

      });

      it('`userEmail` must be valid email address', function () {

        fakeOrder.userEmail = "BLOOP";

        return fakeOrder.validate()
          .then(function () {
            throw new Error('Must provide a valid email address!');
          },
          function (result) {
            expect(result).to.be.an.instanceOf(Error);
          });

      });

      it('has `shippingAddress` field that is a string', () => {
        expect(fakeOrder.shippingAddress).to.be.a('string')
        expect(fakeOrder.shippingAddress).to.equal('10 Doggo Lane, Barktown, Pupperville, 10000')
      })
      it('requires `shippingAddress` field', function () {

        fakeOrder.shippingAddress = null;

        return fakeOrder.validate()
          .then(function () {
            throw new Error('shippingAddress cannot be null!');
          },
          function (result) {
            expect(result).to.be.an.instanceOf(Error);
          });

      });

      it('`shippingAddress` cannot be an empty string', function () {

        fakeOrder.shippingAddress = '';

        return fakeOrder.validate()
          .then(function () {
            throw new Error('shippingAddress cannot be an empty string!');
          },
          function (result) {
            expect(result).to.be.an.instanceOf(Error);
          });

      });
    })

      describe('`totalPrice` virtual field', function(){
        it('adds up the total price of the objects in the `items` array', function () {
          expect(fakeOrder.totalPrice).to.equal(37)

          fakeOrder.items = [
            {productId: 8, unitPrice: 12, quantity: 1.75},
          ]
          expect(fakeOrder.totalPrice).to.equal(21);

          fakeOrder.items = [
            {productId: 8, unitPrice: 10, quantity: 1.75},
            {productId: 10, unitPrice: 4, quantity: 9.99}
          ]
          expect(fakeOrder.totalPrice).to.equal(57.46);
        })

      })
  }) // end describe(attributes and options definition')
}) // end describe('User model')
