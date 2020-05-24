const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const promised = require('chai-as-promised');

const expect = chai.expect;
chai.should();
chai.use(chaiHttp);
chai.use(promised);

const baseUrl = 'localhost:4999';

describe('server apis tests', () => {
  it('should get letters 9 chars array', (cb) => {
    chai
      .request(baseUrl)
      .get('/api/getLetters?mat=3')
      .end((e, r) => {
        expect(r).to.have.status(200);
        expect(r.body.letters).to.have.length(9);
        cb();
      });
  });
  it('should get letters 16 chars array', (cb) => {
    chai
      .request(baseUrl)
      .get('/api/getLetters?mat=4')
      .end((e, r) => {
        expect(r).to.have.status(200);
        expect(r.body.letters).to.have.length(16);
        cb();
      });
  });
  it('should validate letter apple ', (cb) => {
    chai
      .request(baseUrl)
      .get('/api/checkword?word=apple')
      .end((e, r) => {
        expect(r).to.have.status(200);
        expect(r.body.validation).to.equals(true);
        cb();
      });
  });
  it('should not validate letter asdfg ', (cb) => {
    chai
      .request(baseUrl)
      .get('/api/checkword?word=asdfg')
      .end((e, r) => {
        expect(r).to.have.status(200);
        expect(r.body.validation).to.equal(false);
        cb();
      });
  });
  it('should get score with status 200 ', (cb) => {
    const words= [
      "ram",
      "apple",
      "pen",
      "ok",
      "parrot"	
      ]
    chai
      .request(baseUrl)
      .post('/api/getScore')
      .send({words})
      .end((e, r) => {
        expect(r).to.have.status(200);
        cb();
      });
  });
});