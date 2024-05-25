import { AuthAPI } from 'apis/auth';
import { router } from 'routing';
import { store } from 'store';

import type { AuthPayload } from 'apis/auth';

import { usersServ } from 'services/users';

class AuthService {
  private api = new AuthAPI();
  private serv = usersServ;

  public async singIn(data: AuthPayload): Promise<void> {
    store.set('isLoading', true);

    const isAuth = await this.api.login(data)
      .then(({ response }) => response === 'OK')
      // .cathch(error) // TODO: catch error
      .catch(() => false);

    if (isAuth) await this.serv.getUser();
    if (store.get()?.user?.id) {
      // router.authState = isAuth;
      router.go('/messenger');
    }

    store.set('isLoading', false);
  }

  public signOut() {}
}

export const authServ = new AuthService();
