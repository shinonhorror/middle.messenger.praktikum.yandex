import {
  UserUpdatePassType,
  UserUpdateType,
  UserType,
} from '@/types/UserTypes';
import HTTPTransport from './HTTPTransport';

const userAPIInstance = new HTTPTransport('/user');

export default class UserAPI {
  update(
    body: UserUpdateType | UserUpdatePassType,
    path: string,
  ): Promise<UserType> {
    return userAPIInstance
      .put(path, {
        method: 'PUT',
        data: body,
      })
      .then((data) => data.response);
  }

  updateAvatar(file: FormData): Promise<UserType> {
    return userAPIInstance
      .put('/profile/avatar', {
        method: 'PUT',
        data: file,
      })
      .then((data) => data.response);
  }

  search(body: { [key: string]: FormDataEntryValue }): Promise<XMLHttpRequest> {
    return userAPIInstance
      .post('/search', {
        method: 'POST',
        data: body,
      })
      .then((data) => data.response);
  }
}
