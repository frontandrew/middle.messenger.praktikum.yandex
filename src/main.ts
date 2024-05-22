import * as Pages from 'pages';

import { Templates } from 'ui';
import { registerPartials } from 'tools';
import { router } from 'routing';

import { App } from 'app/components';
import { AppController } from 'app';

registerPartials(Templates);

router
  .use({ pathname: '/', component: Pages.PageLogin })
  .use({ pathname: '/sign-up', component: Pages.PageReg })
  .use({ pathname: '/settings', component: Pages.PageUser })
  .use({ pathname: '/messenger', component: Pages.PageChats })
  .use({ pathname: '/error', component: Pages.PageError });

const root = document.querySelector('.main');
const app = new App();
root?.appendChild(app.getContent()!);

const controller = new AppController();
(async () => { await controller.start(); })();

/* IMPORTANT: start router after App render */

router.start();
