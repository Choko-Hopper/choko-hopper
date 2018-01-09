/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')



describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('attributes definition', () => {
    let hotChocolate

    beforeEach(() => {
      return Product.create({
        name: 'Hot Chocolate',
        imageUrl: 'https://cafedelites.com/wp-content/uploads/2016/12/Special-Ingredient-Hot-Chocolate-Images-42.jpg',
        price: 10.5,
        isInStock: true,
        description: 'Warm up with this rich and flavorful Belgian hot chocolate!'
      })
        .then(product => {
          hotChocolate = product
        })
    })

    it('has `name` field', () => {
      expect(hotChocolate.name).to.equal('Hot Chocolate')
    })

    it('requires `name` field', function () {

      hotChocolate.name = null;

      return hotChocolate.validate()
        .then(function () {
          throw new Error('validation should fail when content is null');
        },
        function (result) {
          expect(result).to.be.an.instanceOf(Error);
        });

    });

    it('has `imageUrl` field', () => {
      expect(hotChocolate.imageUrl).to.equal('https://cafedelites.com/wp-content/uploads/2016/12/Special-Ingredient-Hot-Chocolate-Images-42.jpg')
    })


    it('has `price` field that is a FLOAT', () => {
      expect(hotChocolate.price).to.equal(10.5)
      expect(hotChocolate.price).to.be.a('number')
    })

    it('has a minimum `price` of 0', function () {

      hotChocolate.price = -1;

      return hotChocolate.validate()
        .then(function () {
          throw new Error('validation should fail when price below zero');
        },
        function (result) {
          expect(result).to.be.an.instanceOf(Error);
        });

    });



  }) // end describe('attributes definition')
}) // end describe('User model')

