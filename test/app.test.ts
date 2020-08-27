import {expect} from 'chai';
import {agent as request} from 'supertest';
import app from '../src/app';

describe("App Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });


  it('should return array users around london', async function() {
    const res = await request(app).get('/api/city/London').set('Accept', 'application/json');
    expect(res.status).to.equal(200) &&
    expect(res.body).to.be.an.instanceof(Array);
  });

  it('should return empty array for users around Preston', async function() {
      const res = await request(app).get('/api/city/Preston').set('Accept', 'application/json');
      expect(res.status).to.equal(200) &&
      expect(res.body).to.be.an.instanceof(Array) &&
      expect(res.body).to.be.empty;
    });


});

