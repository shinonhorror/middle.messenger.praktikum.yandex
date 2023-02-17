import HTTPTransport from './HTTPTransport';

const host = 'https://ya-praktikum.tech';
const resourceAPIInstance = new HTTPTransport(`${host}/api/v2/resources`);

export default class ResourceAPI {
  public request(pathname: string): Promise<string> {
    return resourceAPIInstance
      .get(pathname, {
        method: 'GET',
      })
      .then((data) => data.responseURL);
  }

  public create(body: FormData): Promise<XMLHttpRequest> {
    return resourceAPIInstance
      .post('', {
        method: 'POST',
        data: body,
      })
      .then((data) => data.response);
  }
}
