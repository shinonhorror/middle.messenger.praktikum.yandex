import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
  const testAPIInstance = new HTTPTransport('/posts', true);
  it('GET should return status 200', async () => {
    // act
    const res = await testAPIInstance.get('/1');
    // assert
    expect(res.status).to.be.equal(200);
  });
  it('POST should return status 201', async () => {
    // act
    const res = await testAPIInstance.post('', {
      method: 'POST',
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    // assert
    expect(res.status).to.be.equal(201);
  });
  it('PUT should return status 200', async () => {
    // act
    const res = await testAPIInstance.put('/1', {
      method: 'PUT',
      data: {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    // assert
    expect(res.status).to.be.equal(200);
  });
  it('DELETE should return status 200', async () => {
    // act
    const res = await testAPIInstance.put('/1', {
      method: 'DELETE',
    });
    // assert
    expect(res.status).to.be.equal(200);
  });
});
