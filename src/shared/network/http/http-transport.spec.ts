import { expect, describe, beforeAll, beforeEach, test } from 'vitest';
import { useFakeXMLHttpRequest, spy } from 'sinon';
import { REST_HOST } from 'config';

import type { SinonFakeXMLHttpRequest, SinonSpy } from 'sinon';

import { HTTPTransport, METHODS } from './http-transport';
import { queryStringify } from '../tools';

describe('Instance of HTTPTransport', () => {
  type ObjectPayload = { offset: number, limit: number, search: string };
  type Request = SinonFakeXMLHttpRequest & {
    send: (body?: Document | XMLHttpRequestBodyInit | null) => typeof body;
    open: (method: string, url: string | URL) => [typeof method, typeof url];
    setRequestHeader: (name: string, value: string) => void;
  }

  const testURL = '/test';

  const objectPayload = { offset: 0, limit: 50, search: 'any' };
  const formDataPayload = new FormData();

  const headers = {
    'First-header': 'first/value',
    'Second-header': 'second/value',
    'Third-header': 'third/value',
  };

  const jsonHeader = { 'Content-Type': 'application/json' };

  const http = new HTTPTransport();
  const fakeXHR = useFakeXMLHttpRequest();
  let request: Request;
  let sendSpy: SinonSpy;
  let openSpy: SinonSpy;

  fakeXHR.onCreate = ((xhr: Request) => {
    request = xhr;
    request.send = (body) => body;
    request.open = (method, url) => [method, url];
    request.setRequestHeader = function (name, value) {
      const { requestHeaders } = this;
      this.requestHeaders = { ...requestHeaders, [name]: value };
    };

    sendSpy = spy(request, 'send');
    openSpy = spy(request, 'open');
  });

  // @ts-expect-error @typescript-eslint/ban-ts-comment
  global.XMLHttpRequest = fakeXHR;

  // afterEach(() => {

  // })

  /* GET METHOD TESTS */
  describe(`on call GET method`, () => {
    describe(`without any options`, () => {
      beforeEach(() => {
        http.get(testURL);
      });

      test(`open XHR with param "method" equals "GET"`, () => {
        expect(openSpy.args[0]).is.include(METHODS.GET, 'Incorrect request method');
      });
      test(`open XHR with param "url" equals "[HOST]+[/url]"`, () => {
        expect(openSpy.args[0]).is.include(`${REST_HOST}${testURL}`, 'Incorrect request URL');
      });
    });

    describe(`with data param`, () => {
      beforeAll(() => {
        http.get<ObjectPayload, void>(testURL, { data: objectPayload });
      });

      test(`open XHR with param "url" equals "[HOST]+[/url]+[?stringified data]"`, () => {
        const expectedURL = `${REST_HOST}${testURL}?${queryStringify(objectPayload)}`;
        expect(openSpy.args[0]).is.include(expectedURL, 'Incorrect request URL params');
      });
    });

    describe(`with headers param`, () => {
      beforeAll(() => {
        http.get(testURL, { headers });
      });

      test(`open XHR with param "headers", witch include setted headers`, () => {
        expect(request.requestHeaders).is.include(headers, 'Incorrect request headers');
      });
    });
  });

  /* POST METHOD TESTS */
  describe(`on call POST request`, () => {
    describe(`without any options`, () => {
      beforeEach(() => {
        http.post(testURL);
      });

      test(`open XHR with param "method" equals "post"`, () => {
        expect(openSpy.args[0]).is.include(METHODS.POST, 'Incorrect request method');
      });
      test(`open XHR with param "url" equals "[HOST]+[/url]"`, () => {
        expect(openSpy.args[0]).is.include(`${REST_HOST}${testURL}`, 'Incorrect request URL');
      });
    });

    describe(`with "data" param type of "Object"`, () => {
      beforeAll(() => {
        http.post<ObjectPayload, void>(testURL, { data: objectPayload });
      });

      test(`send XHR with param "body" stringifyed to JSON and content type header`, () => {
        expect(sendSpy.args[0].length).is.eq(1, 'Expected only one argument');
        expect(typeof (sendSpy.args[0][0])).is.eq('string', 'Incorrect request body type');
        expect(request.requestHeaders).is.include(jsonHeader, 'Content type header error');
      });
    });

    describe(`with "data" param type of "FormData"`, () => {
      beforeAll(() => {
        http.post<FormData, void>(testURL, { data: formDataPayload });
      });

      test(`send XHR with param "body" stringifyed to JSON and content type header`, () => {
        expect(sendSpy.args[0].length).is.eq(1, 'Expected only one argument');
        expect(sendSpy.args[0][0]).is.instanceof(FormData, 'Incorrect request body type');
        expect(request.requestHeaders).is.not.include(jsonHeader, 'Content type header error');
      });
    });

    describe(`with headers param`, () => {
      beforeAll(() => {
        http.post(testURL, { headers });
      });

      test(`open XHR with param "headers", witch include setted headers`, () => {
        expect(request.requestHeaders).is.include(headers, 'Incorrect request headers');
      });
    });
  });

  /* PUT METHOD TESTS */
  describe(`on call PUT request`, () => {
    describe(`without any params`, () => {
      beforeEach(() => {
        http.put(testURL);
      });

      test(`open XHR with param "method" equals "PUT"`, () => {
        expect(openSpy.args[0]).is.include(METHODS.PUT, 'Incorrect request method');
      });
      test(`open XHR with param "url" equals "[HOST]+[/url]"`, () => {
        expect(openSpy.args[0]).is.include(`${REST_HOST}${testURL}`, 'Incorrect request URL');
      });
    });

    describe(`with headers param`, () => {
      beforeAll(() => {
        http.put(testURL, { headers });
      });

      test(`open XHR with param "headers", witch include setted headers`, () => {
        expect(request.requestHeaders).is.include(headers, 'Incorrect request headers');
      });
    });

    describe(`with "data" param type of "Object"`, () => {
      beforeAll(() => {
        http.put<ObjectPayload, void>(testURL, { data: objectPayload });
      });

      test(`send XHR with param "body" stringifyed to JSON and content type header`, () => {
        expect(sendSpy.args[0].length).is.eq(1, 'Expected only one argument');
        expect(typeof (sendSpy.args[0][0])).is.eq('string', 'Incorrect request body type');
        expect(request.requestHeaders).is.include(jsonHeader, 'Content type header error');
      });
    });

    describe(`with "data" param type of "FormData"`, () => {
      beforeAll(() => {
        http.put<FormData, void>(testURL, { data: formDataPayload });
      });

      test(`send XHR with param "body" stringifyed to JSON and content type header`, () => {
        expect(sendSpy.args[0].length).is.eq(1, 'Expected only one argument');
        expect(sendSpy.args[0][0]).is.instanceof(FormData, 'Incorrect request body type');
        expect(request.requestHeaders).is.not.include(jsonHeader, 'Content type header error');
      });
    });
  });

  /* DELETE METHOD TESTS */
  describe(`on call DELETE request`, () => {
    describe(`without any params`, () => {
      beforeEach(() => {
        http.delete(testURL);
      });

      test(`open XHR with param "method" equals "DELETE"`, () => {
        expect(openSpy.args[0]).is.include(METHODS.DELETE, 'Incorrect request method');
      });
      test(`open XHR with param "url" equals "[HOST]+[/url]"`, () => {
        expect(openSpy.args[0]).is.include(`${REST_HOST}${testURL}`, 'Incorrect request URL');
      });
    });

    describe(`with headers param`, () => {
      beforeAll(() => {
        http.delete(testURL, { headers });
      });

      test(`open XHR with param "headers", witch include setted headers`, () => {
        expect(request.requestHeaders).is.include(headers, 'Incorrect request headers');
      });
    });

    describe(`with "data" param type of "Object"`, () => {
      beforeAll(() => {
        http.delete<ObjectPayload, void>(testURL, { data: objectPayload });
      });

      test(`send XHR with param "body" stringifyed to JSON and content type header`, () => {
        expect(sendSpy.args[0].length).is.eq(1, 'Expected only one argument');
        expect(typeof (sendSpy.args[0][0])).is.eq('string', 'Incorrect request body type');
        expect(request.requestHeaders).is.include(jsonHeader, 'Content type header error');
      });
    });

    describe(`with "data" param type of "FormData"`, () => {
      beforeAll(() => {
        http.delete<FormData, void>(testURL, { data: formDataPayload });
      });

      test(`send XHR with param "body" stringifyed to JSON and content type header`, () => {
        expect(sendSpy.args[0].length).is.eq(1, 'Expected only one argument');
        expect(sendSpy.args[0][0]).is.instanceof(FormData, 'Incorrect request body type');
        expect(request.requestHeaders).is.not.include(jsonHeader, 'Content type header error');
      });
    });
  });
});
