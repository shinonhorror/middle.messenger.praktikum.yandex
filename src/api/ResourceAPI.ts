import HTTPTransport from './HTTPTransport';

const host = 'https://ya-praktikum.tech';
const resourceAPIInstance = new HTTPTransport(`${host}/api/v2/resources`);

export default class ResourceAPI {
  public request(pathname: string) {
    return resourceAPIInstance
      .get(pathname, {
        method: 'GET',
      })
      .then((data) => data.responseURL);
  }

  public create(body:FormData) {
    return resourceAPIInstance
      .post('', {
        method: 'POST',
        data: body,
      })
      .then((data) => data.response);
  }
}
