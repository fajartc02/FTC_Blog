const chai = require('chai')
const expect = chai.expect

const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const User = require('../models/modelUser')
const Article = require('../models/modelArticle')

chai.use(chaiHttp)

describe('check routes user', function () {
  beforeEach(function (done) {
    // cannot use .env for testing
    mongoose.connect('mongodb://tesblog:tesblog02@ds127362.mlab.com:27362/ftc_blog_testing', { useNewUrlParser: true }, function () {
      User.collections.drop() // selalu di reset untuk testing
    })
    done()
  })

  it('POST /signup should return new data user', function (done) {
    chai.request('http://localhost:3000')
      .post('/signup')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'wisnu01',
        email: 'wisnu01@mail.com',
        password: 'wisnu01'
      })
      .end(function (err, res) {
        // console.log(res.body); // check conf res bentuknya apa??
        expect(res).to.have.status(201) // check status 
        expect(res).to.be.a('object') // check type data
        expect(res.body.length).to.equal(1)
        expect(res.body).to.have.property('username')

        expect(res.body.username).to.equal('fajar02')
        done()
      })
  })

  // it('POST /signin should return user', function (done) {
  //   chai.request('http://localhost:3000')
  //     .post('/signin')
  //     .set('Content-type', 'application/x-www-form-urlencoded')
  //     .send({
  //       email: 'wisnu01@mail.com',
  //       password: 'wisnu01'
  //     })
  //     .end(function (err, res) {
  //       // console.log(res.body); // check conf res bentuknya apa??
  //       expect(res).to.have.status(201) // check status 
  //       expect(res).to.be.a('array') // check type data
  //       expect(res.body.length).to.equal(1)
  //       expect(res.body).to.have.property('email')

  //       expect(res.body.username).to.equal('fajar02')
  //     })
  //   done()
  // })
})



// describe('check Routes article', function () {
//   beforeEach(function (done) {
//     // cannot use .env for testing
//     mongoose.connect('mongodb://tesblog:tesblog02@ds127362.mlab.com:27362/ftc_blog_testing', { useNewUrlParser: true }, function () {
//       Article.collections.drop(function (err) {
//         if (err) {
//           done(err)
//         } else {
//           done()
//         }
//       }) // selalu di reset untuk testing
//     })
//   })

//   it('GET /article should return all article', function (done) {
//     chai.request('http://localhost:3000')
//       .get('/article')
//       .end(function (err, res) {
//         // console.log(res.body);
//         expect(res).to.have.status(200)
//         expect(res).to.be.a('object')
//         expect(res.body.length).to.equal(1)
//         expect(res.body[0].data).to.have.property('title')

//         expect(res.body[0].data.title).to.equal('Soekarno')
//       })
//     done()
//   })

//   it('POST /article should return new article', function (done) {
//     chai.request('http://localhost:3000')
//       .post('/article')
//       .send({
//         title: 'Soekarno',
//         author: 'Sayuti Malik',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti optio, magnam, at nulla veniam voluptatum quasi iste id, ipsa beatae placeat cum! Quia veritatis quidem adipisci possimus libero doloribus ut.'
//       })
//       .end(function (err, res) {
//         // console.log(res.body);

//         expect(res).to.have.status(201)
//         expect(res).to.be.a('object')

//         expect(res.body.data).to.have.property('title')

//         expect(res.body.data.title).to.equal('Soekarno')
//         done()
//       })
//   })
//   it('PUT /article/edit/:id should return all article', function (done) {
//     chai.request('http://localhost:3000')
//       .put('/article/edit/:id')
//       .send({
//         title: 'Soekarno',
//         author: 'Sayuti Malik',
//         description: 'sejarah'
//       })
//       .end(function (err, res) {
//         // console.log(res.body);
//         expect(res).to.have.status(200)
//         expect(res).to.be.a('object')
//         expect(res.body.length).to.equal(1)
//         expect(res.body[0].data).to.have.property('title')

//         expect(res.body[0].data.description).to.equal('Soekarno')
//         done()
//       })
//   })
//   it('DELETE /article/delete/:id should return all article', function () {
//     chai.request('http://localhost:3000')
//       .put('/article/delete/5b7baa7942f7a04bc7a54006')
//       .send({
//         title: 'Soekarno',
//         author: 'Sayuti Malik',
//         description: 'sejarah'
//       })
//       .end(function (err, res) {
//         console.log(res.body);
//         expect(res).to.have.status(200)
//         expect(res).to.be.a('string')
//         expect(res.body.length).to.equal(0)
//         done()
//       })
//   })
// })