const request = require('request');
const { expect } = require('chai');

describe('Deep Integration Testing', () => {
  describe('GET /', () => {
    it('should return status 200 and welcome message', (done) => {
      request('http://localhost:7865', (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('Welcome to the payment system');
        done();
      });
    });
  });

  describe('GET /cart/:id', () => {
    it('should return status 200 and payment methods for a valid ID', (done) => {
      request('http://localhost:7865/cart/123', (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 123');
        done();
      });
    });

    it('should return status 404 for an invalid ID', (done) => {
      request('http://localhost:7865/cart/abc', (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        expect(body).to.equal('Invalid ID');
        done();
      });
    });
  });

  describe('POST /login', () => {
    it('should return status 200 and a welcome message for a valid userName', (done) => {
      request.post(
        'http://localhost:7865/login',
        { json: { userName: 'JohnDoe' } },
        (err, res, body) => {
          expect(res.statusCode).to.equal(200);
          expect(body).to.equal('Welcome JohnDoe');
          done();
        }
      );
    });

    it('should return status 400 for a missing userName', (done) => {
      request.post(
        'http://localhost:7865/login',
        { json: {} },
        (err, res, body) => {
          expect(res.statusCode).to.equal(400);
          expect(body).to.equal('Missing userName');
          done();
        }
      );
    });
  });
});

