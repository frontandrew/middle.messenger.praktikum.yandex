import * as Pages from 'pages';
import { router } from 'routing';
import { Templates } from 'ui';
import { registerPartials } from 'tools';

registerPartials(Templates);

router
  .use({ pathname: '/', component: Pages.PageLogin })
  .use({ pathname: '/sing-up', component: Pages.PageReg })
  .use({ pathname: '/settings', component: Pages.PageUser })
  .use({ pathname: '/messenger', component: Pages.PageChats })
  .use({ pathname: '/error', component: Pages.PageError })
  .start();
