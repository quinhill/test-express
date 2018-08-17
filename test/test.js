const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const server = require('../server');

describe('GET /api/v1/students', () => {
  it('should return all students', done => {
    chai.request(server)
      .get('/api/v1/students')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        // length of array
        // properties of objects in array
        // values of objects in array
        done();
      })
  });
});

describe('POST /api/v1/students', () => {
  it('should create a new student', done => {
    chai.request(server)
      .post('/api/v1/students')
      .send({
        'lastname': 'jesus', 
        'program': 'FE', 
        'enrolled': true
      })
      .end((err, response) => {
        response.should.have.status(201)
        done();
      })
  })

  it('should not create a new student with missing information', done => {
    chai.request(server)
      .post('/api/v1/students')
      .send({
        'lastname': '',
        'program': '',
      })
      .end((err, response) => {
        response.should.have.status(422)
        done();
      })
  })
})