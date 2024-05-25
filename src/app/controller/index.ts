import { usersServ as serv } from 'services/users';
import { router } from 'routing';
import { store } from 'store';

import { UserResponse } from 'apis/user';

class AppController {
  async appInit() {
    store.init();
    store.set('isLoading', true);
    router.start();

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
    // if (typeof user === 'string') {
    //   store.set('user', JSON.parse(user));
    // }
  }
}

export const appController = new AppController();
