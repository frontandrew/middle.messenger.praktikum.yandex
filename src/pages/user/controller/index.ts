import { AuthAPI } from 'api/auth-api';
import { UserController } from 'entities/user';
import { router } from 'routing';
import { store } from 'store';

import type { UserProfilePayload } from 'entities/user';

import type { FormInfoData } from '../components';

const userController = new UserController();
const authApi = new AuthAPI();

class UserPageController {
  async changeUserInfo(data: FormInfoData) {
    store.set('isLoading', true);

    const userInfo = await userController.updateUser(this.formatUserInfoPayload(data))
      .then((response) => response)
      // TODO: catch error
      .catch(() => null);

    const responseState = Boolean(userInfo?.id);
    if (responseState) {
      store.set('user', userInfo);
    }
    store.set('isLoading', false);

    return responseState;
  }

  async singOut() {
    store.set('isLoading', true);
    const logoutState = await authApi.logout()
      .then(({ response }) => response === 'OK')
      .catch(() => false);

    /* TODO: need to setup default appConfig */
    store.set('messages', null);
    store.set('chats', null);
    store.set('user', null);
    store.set('isLoading', false);

    router.authState = !logoutState;
    router.go('/');
  }

  formatUserInfoPayload(user: FormInfoData): UserProfilePayload {
    const { firstName, secondName, nickName, phone, ...rest } = user;
    return {
      first_name: firstName,
      second_name: secondName,
      display_name: nickName,
      phone: phone.split(' ').join(''),
      ...rest,
    };
  }
}

export const userPageController = new UserPageController();
