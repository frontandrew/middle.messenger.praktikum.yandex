import { REST_HOST } from 'config';
import { isValidJSON } from 'tools';
import { queryStringify } from '../tools';

export enum METHODS {
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

type HTTPMethod = <PayloadType, ResponseType>
  (url: string, options?: Options<PayloadType>) => Promise<Response<ResponseType>>

export class HTTPTransport {
  public get: HTTPMethod = (url, options = {}) => this
    .request(url, { ...options, method: METHODS.GET });

  public post: HTTPMethod = (url, options = {}) => this
    .request(url, { ...options, method: METHODS.POST });

  public put: HTTPMethod = (url, options = {}) => this
    .request(url, { ...options, method: METHODS.PUT });

  public delete: HTTPMethod = (url, options = {}) => this
    .request(url, { ...options, method: METHODS.DELETE });

  private request<R>(url: string, options: RequestOptions): Promise<R> {
    const { headers = {}, method, data = {}, timeout = 10000 } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('Requesr error: unexpected method given.'));
        return;
      }

      let requestUrl = REST_HOST + url;
      if (method === METHODS.GET && Object.keys(data).length) {
        requestUrl += `?${queryStringify(data)}`;
      }

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.timeout = timeout;
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        const { status, response } = xhr;
        if (status >= 200 && status < 300) {
          const respHeads = xhr.getAllResponseHeaders();
          const isJSON = respHeads
            .includes('content-type: application/json') && isValidJSON(response);

          // @ts-expect-error-next-line
          resolve({ status, response: isJSON ? JSON.parse(response) : response });
        } else reject(new Error(`${response}`));
      };

      xhr.open(method, requestUrl);
      xhr.onerror = () => reject(new Error(`Error requesting ${url}: ${xhr.statusText}`));
      xhr.onabort = () => reject(new Error('Request was aborted'));
      xhr.ontimeout = () => reject(new Error(`Timeout while requesting ${url}`));

      if (method === METHODS.GET) xhr.send();
      else if (data instanceof FormData) xhr.send(data);
      else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
