/* eslint prefer-arrow-callback:0, func-names:0 */
const app = require('../../app');

require('chai').should();

const request = require('supertest');

const mailboxDao = require('../../dao/mailbox/');


<<<<<<< HEAD
describe('/mailbox api', function () {
  let id;
  it('should create a new mailbox', function (done) {
    request(app)
      .post('/mailbox')
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) { done(err); return; }
        res.body.should.have.property('id').equal(res.body.id).a('string');
        id = res.body.id;
        mailboxDao.checkIfMailboxExists(id).should.be.equal(true);
        done();
      });
  });

  it('should delete a mailbox', function (done) {
    mailboxDao.checkIfMailboxExists(id).should.be.equal(true);
    request(app)
      .delete(`/mailbox/${id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) { done(err); return; }
        res.body.should.have.property('id').equal(res.body.id).a('string');
        mailboxDao.checkIfMailboxExists(id).should.be.equal(false);
        done();
      });
  });

  it('should return an error when we try to delete a mailbox that does not exist', function (done) {
    mailboxDao.checkIfMailboxExists(id).should.be.equal(false);
    request(app)
      .delete(`/mailbox/${id}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) { done(err); return; }
        res.body.should.have.property('message').equal(`Mailbox with id ${id} does not exist`);
        mailboxDao.checkIfMailboxExists(id).should.be.equal(false);
        done();
      });
  });
});
=======
// describe('/mailbox api', () => {
//   let id;
//   it('should create a new mailbox', (done) => {
//     request(app)
//       .post('/mailbox')
//       .expect(201)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { done(err); return; }
//         expect(res.body).to.have.property('id');
//         expect(res.body.id).to.be.a('string');
//         id = res.body.id;
//         expect(mailboxDao.checkIfMailboxExists(id)).to.equal(true);
//         done();
//       });
//   });

//   it('should delete a mailbox', (done) => {
//     request(app)
//       .delete(`/mailbox/${id}`)
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { done(err); return; }
//         expect(res.body).to.have.property('id');
//         expect(res.body.id).to.equal(id);
//         expect(mailboxDao.checkIfMailboxExists(id)).to.equal(false);
//         done();
//       });
//   });

//   it('should return an error when we try to delete a mailbox that does not exist', (done) => {
//     request(app)
//       .delete(`/mailbox/${id}`)
//       .expect(404)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { done(err); return; }
//         expect(res.body).to.have.property('message').equal(`Mailbox with id ${id} does not exist`);
//         expect(mailboxDao.checkIfMailboxExists(id)).to.equal(false);
//         done();
//       });
//   });
// });
>>>>>>> cassandra-integration
