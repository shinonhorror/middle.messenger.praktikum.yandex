import HTTPTransport from './HTTPTransport';

const resourceAPIInstance = new HTTPTransport('/resources');

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
