import { queryStringify } from '@/utils/helpers';

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}
const API_YANDEX = 'https://ya-praktikum.tech/api/v2';
interface Options {
  method: string;
  timeout?: number;
  data?: any;
  expires?: number;
  headers?: Record<string, string>;
}

type HTTP = (
  url: string | URL,
  options?: Options
) => Promise<XMLHttpRequest>;

export default class HTTPTransport {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  get: HTTP = (url, options) => this.request(url, { ...options, method: METHODS.GET }, options?.timeout);

  put: HTTP = (url, options) => this.request(
    url,
    {
      ...options,
      method: METHODS.PUT,
      headers: {
        ...options?.headers,
      },
    },
    options?.timeout,
  );

  post: HTTP = (url, options) => this.request(url, {
    ...options,
    method: METHODS.POST,
    headers: {
      ...options?.headers,
    },
  }, options?.timeout);

  delete: HTTP = (url, options) => this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);

  request = (
    url: string | URL,
    options: Options,
    timeout: number = 10000,
  ): Promise<XMLHttpRequest> => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        const error = new Error('No method');
        reject(error);
        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.open(
        method,
        isGet && !!data
          ? `${API_YANDEX}${this.url + url}${queryStringify(data)}`
          : API_YANDEX + this.url + url,
      );

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-type', 'application/json');
      }
      xhr.onload = () => {
        if (xhr.status < 400) {
          resolve(xhr);
        } else {
          reject(xhr.response.reason);
        }
      };
      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (isGet || !data) {
        xhr.send();
      } else if (!(data instanceof FormData)) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  };
}
