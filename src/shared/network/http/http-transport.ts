/* TODO: need format document */
import { queryStringify } from './queryStringify';

const API_URL = 'https://ya-praktikum.tech/api/v2';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options<PayloadType> {
  data?: PayloadType extends PlainObject ? PlainObject : FormData;
  timeout?: number;
  headers?: Record<string, string>;
}

interface RequestOptions extends Options<PlainObject> {
  method: METHODS;
}

/* TODO: need typing request error */
interface Response<T> {
  status: number;
  response: T
}

export class HTTPTransport {
  get<PayloadType, ResponseType>(url: string, options: Options<PayloadType> = {}) {
    return this.request<ResponseType>(url, { ...options, method: METHODS.GET }, options.timeout);
  }

  post<PayloadType, ResponseType>(url: string, options: Options<PayloadType> = {}) {
    return this.request<ResponseType>(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put<PayloadType, ResponseType>(url: string, options: Options<PayloadType> = {}) {
    return this.request<ResponseType>(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete<PayloadType, ResponseType>(url: string, options: Options<PayloadType> = {}) {
    return this.request<ResponseType>(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  request<ResponseType>(
    url: string,
    options:RequestOptions,
    timeout = 10000,
  ): Promise<Response<ResponseType>> {
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
        if (status >= 200 && status < 300) resolve({ status, response: JSON.parse(response) });
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
  }
}
