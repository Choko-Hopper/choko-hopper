/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(function () {
    return Promise.all([
      User.truncate({ cascade: true })
    ]);
  });

  describe('GET /api/users', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        id: 1,
        email: codysEmail,
        isAdmin: true
      })
    })

    it('gets all users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  })// end describe('GET /api/users/')

  describe('GET /api/users/:id', () => {
    let selectedUser

    beforeEach(() => {
      let creatingUsers = [{
        id: 3,
        email: 'cody@puppybook.com',
        isAdmin: true
      }, {
        id: 4,
        email: 'mike@puppybook.com',
        isAdmin: true
      }, {
        id: 5,
        email: 'jamie@puppybook.com',
        isAdmin: true
      }]
      .map(data => User.create(data));

      return Promise.all(creatingUsers)
      .then(createdUsers => {
        selectedUser = createdUsers[2];
      });
    })

    it('gets users by id', () => {
      return request(app)
        .get('/api/users/' + selectedUser.id)
        .expect(200)
        .then(res => {
          if (typeof res.body === 'string') {
            res.body = JSON.parse(res.body);
          }
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.be.equal('jamie@puppybook.com')
        })
    })
  }) // end describe('GET /api/users/:id')

  describe('POST /api/users/', () => {
    it('creates a new user', function () {
      return request(app)
      .post('/api/users/')
      .send({
        id: 2,
        email: 'schoolrules@gmail.com',
        isAdmin: true
      })
      .expect(201)
      .expect(function (res) {
        expect(res.body.id).to.equal(2);
        expect(res.body.email).to.equal('schoolrules@gmail.com');
      });

    });
  })// end describe('POST /api/users/')

  describe('PUT /api/users/:id', () => {
    let selectedUser

    beforeEach(() => {
      return User.create({
        id: 7,
        email: 'camera@email.com',
        isAdmin: true
      })
      .then(createdUser => {
        selectedUser = createdUser
      })
    })


    it('updates a user', function () {
      return request(app)
      .put('/api/users/' + selectedUser.id)
      .send({
        email: 'youreonCANDIDcamera@gmail.com',
        isAdmin: true
      })
      .expect(function (res) {
        expect(res.body.id).to.equal(7);
        expect(res.body.email).to.equal('youreonCANDIDcamera@gmail.com');
        expect(res.body.isAdmin).to.equal(true);
      });

    });
  })// end describe('POST /api/users/')

  describe('DELETE /api/users/:id', () => {
    let selectedUser

    beforeEach(() => {
      return User.create({
        id: 10,
        email: 'callmebaby@email.com',
        isAdmin: true
      })
      .then(createdUser => {
        selectedUser = createdUser
      })
    })

    it('deletes a user', function () {
      return request(app)
      .delete('/api/users/' + selectedUser.id)
      .expect(204)
    });
  })// end describe('DELETE /api/users/:id')
}) // end describe('User routes')
