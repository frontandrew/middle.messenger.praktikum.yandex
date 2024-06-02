import { AuthAPI } from 'apis/auth';
import { router } from 'routing';
import { store } from 'store';

import type { AuthPayload } from 'apis/auth';
import { usersServ } from 'services/users';

class AuthService {
  private api = new AuthAPI();

  public async singIn(data: AuthPayload): Promise<void> {
    store.set('isLoading', true);

    const isAuth = await this.api.login(data)
      .then(({ response }) => response === 'OK')
      // .cathch(error) // TODO: catch error
      .catch(() => false);

    if (!isAuth) {
      store.set('isLoading', false);
      return;
    }

    await usersServ.getUser();
    router.go('/messenger');
    store.set('isLoading', false);
  }

  public signOut() {
    store.set('isLoading', true);
    this.api.logout();
    router.setAuthState(false);
    router.go('/');
    store.reset();
  }
}

export const authServ = new AuthService();
