import * as Pages from 'pages';

import { Templates } from 'ui';
import { registerPartials } from 'tools';
import { router } from 'routing';

import { App, appController } from 'app';

registerPartials(Templates);

router
  .use({ pathname: '/', component: Pages.PageLogin })
  .use({ pathname: '/sign-up', component: Pages.PageReg })
  .use({ pathname: '/settings', component: Pages.PageUser })
  .use({ pathname: '/messenger', component: Pages.PageChats })
  .use({ pathname: '/error', component: Pages.PageError });

(async () => { await appController.appInit(); })();

const root = document.querySelector('.main');
const app = new App();
root?.appendChild(app.getContent()!);

window.addEventListener('unload', () => {
  appController.appStop();
});
