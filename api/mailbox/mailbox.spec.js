require('chai').should();

const app = require('../../app');

const expect = require('chai').expect;
// require('chai').should();
const should = require('chai').should();

const request = require('supertest');

const circleDAO = require('../../dao/mailbox');

describe('/mailbox api', () => {
  // const circleId = '1629d450-5279-11e7-a845-d9c5443eaaa0';
  let mailboxId;
  it('it should create a new mailbox', (done) => {
    request(app)
      .post('/mailbox/')
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { done(err); return; }
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.be.a('string');
        mailboxId = res.body.id;
        mailboxDAO.checkIfCircleExists(mailboxId, (error, mailboxExists) => {
          if (err) { done(err); return; }
          mailboxExists.should.be.equal(true);
          done();
        });
      });
  });

  it('should delete a mailbox', (done) => {
    request(app)
      .delete(`/mailbox/${mailboxId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { done(err); return; }
        expect(res.body.id).to.equal(mailboxId);
        mailboxDAO.checkIfMailboxExists(mailboxId, (error, circleExists) => {
          console.log('circleExists:', typeof circleExists);
          circleExists.should.be.equal(false);
          // console.log('circle', circleExists);
          done();
        });
      });
  });

  it('should fail when we try to delete a circle id that does not exist', (done) => {
    request(app)
      .delete(`/circle/${circleId}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { done(err); } else {
          circleDAO.checkIfCircleExists(circleId, (error, circleExists) => {
            if (error) { done(error); return; }
            console.log('circle', JSON.stringify(circleExists));
            circleExists.should.be.equal(false);
            done();
          });
        }
      });
  });
});
