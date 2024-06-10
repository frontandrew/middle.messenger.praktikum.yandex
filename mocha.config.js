import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body></body>');

global.window = jsdom.window;
global.document = jsdom.window.document;
global.history = jsdom.window.history;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.FormData = jsdom.window.FormData;
