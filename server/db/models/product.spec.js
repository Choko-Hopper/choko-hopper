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

    it('has `name` field that is a string', () => {
      expect(hotChocolate.name).to.be.a('string')
      expect(hotChocolate.name).to.equal('Hot Chocolate')
    })

    it('requires `name` field', function () {

      hotChocolate.name = null;

      return hotChocolate.validate()
        .then(function () {
          throw new Error('Content cannot be null!');
        },
        function (result) {
          expect(result).to.be.an.instanceOf(Error);
        });

    });

    it('has `imageUrl` field that is a string', () => {
      expect(hotChocolate.imageUrl).to.be.a('string')
      expect(hotChocolate.imageUrl).to.equal('https://cafedelites.com/wp-content/uploads/2016/12/Special-Ingredient-Hot-Chocolate-Images-42.jpg')
    })

    it('has defaultValue for `imageUrl` field', function () {

      return Product.create({
        name: 'New Chocolate',
        price: 5,
        description: 'So great'
      })
        .then(
        function (newChocolate) {
          expect(newChocolate.imageUrl).to.equal('https://www.thechocolatetherapist.com/wp-content/themes/blankspace-child/images/header-chocolate-shavings.jpg');
          expect(newChocolate.isInStock).to.equal(true);
        });

    });

    it('has `price` field that is a FLOAT', () => {
      expect(hotChocolate.price).to.equal(10.5)
      expect(hotChocolate.price).to.be.a('number')
    })

    it('has a minimum `price` of 0', function () {

      hotChocolate.price = -1;

      return hotChocolate.validate()
        .then(function () {
          throw new Error('You cannot have a negative price...');
        },
        function (result) {
          expect(result).to.be.an.instanceOf(Error);
        });

    });

    it('`price` cannot be null', function () {

      hotChocolate.price = null;

      return hotChocolate.validate()
        .then(function () {
          throw new Error('Price cannot be null!');
        },
        function (result) {
          expect(result).to.be.an.instanceOf(Error);
        });

    });

    it('can handle long `description`', function() {

      let megaLongDescription = 'SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!SO HOT AND AMAZING!'

      hotChocolate.description = megaLongDescription

      return hotChocolate.validate()
      .then(function(result) {
        expect(result).to.be.an('object');
        expect(result.name).to.equal('Hot Chocolate');
        expect(result.description).to.equal(megaLongDescription);
      });

    });

  }) // end describe('attributes definition')
}) // end describe('Product model')

