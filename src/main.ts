import * as Pages from 'pages';
import { Templates } from 'ui';
import { registerPartials } from 'tools';
import { router } from 'routing';
import { store } from 'store';

import { App } from 'app';

import type { State } from 'store';

registerPartials(Templates);

const defaultSatate: State = {
  isLoading: false,
  isAuth: false,
  user: null,
  chats: null,
  messages: null,
};

store.init(defaultSatate);

const root = document.querySelector('.main');
const app = new App();
root?.appendChild(app.getContent()!);

/* IMPORTANT: init router after App render */

router
  .use({ pathname: '/', component: Pages.PageLogin })
  .use({ pathname: '/sing-up', component: Pages.PageReg })
  .use({ pathname: '/settings', component: Pages.PageUser })
  .use({ pathname: '/messenger', component: Pages.PageChats })
  .use({ pathname: '/error', component: Pages.PageError })
  .start();
