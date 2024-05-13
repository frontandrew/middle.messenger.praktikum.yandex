import * as Pages from 'pages';
import { Templates } from 'ui';
import { registerPartials } from 'tools';
import { router } from 'routing';
import { store } from 'store';

registerPartials(Templates);

const defaultSatate = {
  isLoading: false,
};

store.init(defaultSatate);

router
  .use({ pathname: '/', component: Pages.PageLogin })
  .use({ pathname: '/sing-up', component: Pages.PageReg })
  .use({ pathname: '/settings', component: Pages.PageUser })
  .use({ pathname: '/messenger', component: Pages.PageChats })
  .use({ pathname: '/error', component: Pages.PageError })
  .start();
