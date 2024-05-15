import { store } from 'store';
// import { router } from 'routing';

import { AuthAPI } from 'api/auth-api';
import { UserApi } from 'entities/user/api';

import { UserResponse, UserType } from 'entities/user/type';
import type { FormAuthData } from '../components/form-auth/type';

const authApi = new AuthAPI();
const userApi = new UserApi();

export class AuthController {
  public async singIn(data: FormAuthData): Promise<boolean> {
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
      store.set('isAuth', isAuth);
    }

    store.set('isLoading', false);
    return isAuth;
  }

  public async getUser(): Promise<UserType | null> {
    const user = await userApi.getUserData()
      .then(({ response }) => this.formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);

    return user;
  }

  formatUserResponse(data: UserResponse): UserType | null {
    if (!data.id) return null;
    /* eslint-disable camelcase */
    const { first_name, second_name, display_name, avatar, ...rest } = data;
    return {
      firstName: first_name,
      secondName: second_name,
      nickName: display_name,
      image: avatar,
      ...rest,
    };
  }
}
