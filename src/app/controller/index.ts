import * as Pages from 'pages';
import { Templates } from 'ui';

import { INIT_STATE/* , PAGES */ } from 'config';
import { router } from 'routing';
import { registerPartials } from 'tools';
import { store } from 'store';

import { usersServ as serv } from 'services/users';
import { UserResponse } from 'apis/user';

import { App } from '../components';

class AppController {
  async appStart() {
    /* INIT: the initialization sequence is important! */
    this.createStore();
    this.createLayout();
    this.createRouter();

    store.set('isLoading', true);
    const oldUser = this.readSession();

    if (!oldUser?.id) await serv.getUser();
    else store.set('user', oldUser);

    const currUser = store.get()?.user;

    if (!currUser?.id) {
      router.go('/');
      router.setAuthState(false);
      store.set('isLoading', false);
      return;
    }
    router.setAuthState(true);
    store.set('isLoading', false);
  }

  public appStop() {
    this.saveSession();
    store.reset();
    router.setAuthState(false);
  }

  private saveSession() {
    const user = store.get()?.user;
    if (user?.id) sessionStorage.setItem('user', JSON.stringify(user));
    else sessionStorage.removeItem('user');
  }

  private readSession(): UserResponse | null {
    const uesrStr = sessionStorage.getItem('user');
    if (typeof uesrStr === 'string') return JSON.parse(uesrStr);
    return null;
  }

  private createStore() {
    if (!INIT_STATE) {
      throw (new Error('Application initial state is missing'));
    }
    store.init(INIT_STATE);
  }

  private createRouter() {
    router
      .use({ pathname: '/', component: Pages.PageLogin })
      .use({ pathname: '/sign-up', component: Pages.PageReg })
      .use({ pathname: '/settings', component: Pages.PageUser })
      .use({ pathname: '/messenger', component: Pages.PageChats })
      .use({ pathname: '/error', component: Pages.PageError })
      .start();
  }

  private createLayout() {
    registerPartials(Templates);

    const root = document.querySelector('.main');
    const app = new App();
    root?.appendChild(app.getContent()!);
  }
}

export const appController = new AppController();
