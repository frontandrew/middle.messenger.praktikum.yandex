import * as Pages from 'pages';
import { Templates } from 'ui';

import { INIT_STATE, ROUTES } from 'config';
import { router } from 'routing';
import { registerPartials } from 'tools';
import { store } from 'store';

import { usersServ } from 'services/users';

import { App } from '../components';

class AppController {
  async appStart() {
    /* INIT: the initialization sequence is important! */
    this.createStore();
    this.createLayout();
    await this.startSession();
    this.createRouter();
  }

  private createStore() {
    if (!INIT_STATE) throw (new Error('Application initial state is missing'));
    store.init(INIT_STATE);
  }

  private async startSession() {
    store.set('isLoading', true);
    await usersServ.getUser();
    store.set('isLoading', false);
  }

  private createRouter() {
    Object.entries(ROUTES).forEach(([pathname, { page, needAuth }]) => {
      router.use({ pathname, needAuth, component: Pages[page] });
    });
    router.start();
  }

  private createLayout() {
    registerPartials(Templates);

    const root = document.querySelector('.main');
    const app = new App();
    root?.appendChild(app.getContent()!);
  }
}

export const appController = new AppController();
