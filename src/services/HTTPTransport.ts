enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface Options {
  method: string;
  timeout?: number;
  data?: { [key: string]: any };
  headers?: { [key: string]: string };
}

type HTTP = (
  url: string | URL,
  options: Options
) => Promise<XMLHttpRequest>;

function queryStringify(obj:{ [key:string]: any }) {
  const urlParams = `?${Object.keys(obj).map((key) => `${key}=${obj[key]}`).join('&')}`;
  return urlParams;
}

export default class HTTPTransport {
  get: HTTP = (url, options) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put: HTTP = (url, options) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post: HTTP = (url, options) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete: HTTP = (url, options) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (
    url: string | URL,
    options: Options,
    timeout: number = 5000,
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;
    return new Promise((resolve, reject) => {
      if (!method) {
        const error = new Error('No method');
        reject(error);
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr);
        } else {
          const error = new Error(xhr.status.toString());
          reject(error);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data as Document);
      }
    });
  };
}
