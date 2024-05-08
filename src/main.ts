import * as Pages from 'pages';
import { Router } from 'routing';
import { Templates } from 'ui';
import { registerPartials } from 'tools';

registerPartials(Templates);

const router = new Router('.main');

router
  .use({ pathname: '/', component: Pages.PageLogin })
  .use({ pathname: '/sing-up', component: Pages.PageReg })
  .use({ pathname: '/settings', component: Pages.PageUser })
  .use({ pathname: '/messenger', component: Pages.PageChats })
  .use({ pathname: '/error', component: Pages.PageError })
  .start();
