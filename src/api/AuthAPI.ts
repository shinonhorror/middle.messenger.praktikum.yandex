import { UserSign } from '@/types/UserTypes';
import HTTPTransport from './HTTPTransport';

const signInAPIInstance = new HTTPTransport('/auth');

export default class AuthAPI {
  request(body: UserSign, path: string): Promise<XMLHttpRequest> {
    return signInAPIInstance
      .post(path, {
        method: 'POST',
        data: body,
      });
  }

  user(): Promise<UserSign> {
    return signInAPIInstance
      .get('/user', {
        method: 'GET',
      })
      .then((data) => data.response);
  }

  delete(): Promise<XMLHttpRequest> {
    return signInAPIInstance.post('/logout', {
      method: 'POST',
      expires: 0,
    });
  }
}
