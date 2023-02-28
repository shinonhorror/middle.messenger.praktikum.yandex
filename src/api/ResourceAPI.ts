import HTTPTransport from './HTTPTransport';

const resourceAPIInstance = new HTTPTransport('/resources');
export interface ResourceType {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}
export default class ResourceAPI {
  public request(pathname: string): Promise<string> {
    return resourceAPIInstance
      .get(pathname, {
        method: 'GET',
      })
      .then((data) => data.responseURL);
  }

  public create(body: FormData): Promise<ResourceType> {
    return resourceAPIInstance
      .post('', {
        method: 'POST',
        data: body,
      })
      .then((data) => data.response);
  }
}
