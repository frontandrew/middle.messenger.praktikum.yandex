/* eslint-disable implicit-arrow-linebreak */
import { queryStringify } from './queryStringify';

const API_URL = 'https://ya-praktikum.tech/api/v2';

// eslint-disable-next-line no-shadow
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestParams = {
  method: string;
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  timeout?: number;
};

type Method = (url: string, options: Omit<RequestParams, 'method'>) => Promise<unknown>;
type Request = (
  url: string,
  options: RequestParams,
  timeout?: number
) => Promise<unknown>;

export class HTTPTransport {
  get: Method = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post: Method = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put: Method = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete: Method = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request: Request = (url, options, timeout = 10000) => {
    const { headers = {}, method, data = {} } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('Requesr error: unexpected method given.'));
        return;
      }

      let requestUrl = API_URL + url;
      if (method === METHODS.GET && Object.keys(data).length) {
        requestUrl += `?${queryStringify(data)}`;
      }

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.timeout = timeout;
      Object.values(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        const { status = 0, response } = xhr;
        if (status >= 200 && status < 300) resolve(response);
        else reject(new Error(`${response}`));
      };

      xhr.open(method, requestUrl);
      xhr.onerror = () => reject(new Error(`Error requesting ${url}: ${xhr.statusText}`));
      xhr.onabort = () => reject(new Error('Request was aborted'));
      xhr.ontimeout = () => reject(new Error(`Timeout while requesting ${url}`));

      if (method === METHODS.GET) xhr.send();
      else if (data instanceof FormData) xhr.send(data);
      else {
        xhr.setRequestHeader('Content-Type', 'applcation/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
