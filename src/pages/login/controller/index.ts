import { AuthAPI } from 'api';
import { router } from 'routing';
import { store } from 'store';

import { UserController } from 'entities/user';
import type { UserType } from 'entities/user';

import type { FormAuthData } from '../components/form-auth/type';

const authApi = new AuthAPI();
const userController = new UserController();

export class AuthController {
  public async singIn(data: FormAuthData): Promise<void> {
    store.set('isLoading', true);

    const isAuth = await authApi.login(data)
      .then(({ response }) => response === 'OK')
      // .cathch(error) // TODO: catch error
      .catch(() => false);

    if (isAuth) {
      const user = await this.getUser();
      store.set('user', user);
    }
    if (store.get()?.user?.id) {
      router.authState = isAuth;
      router.go('/messenger');
    }

    store.set('isLoading', false);
  }

  public async getUser(): Promise<UserType | null> {
    const user = await userController.getUser();
    return user;
  }
}
