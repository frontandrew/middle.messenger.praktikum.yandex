import { AuthAPI } from 'api/auth-api';
import { UserController } from 'entities/user';
import { router } from 'routing';
import { store } from 'store';

import type { UserPassPayload, UserProfilePayload } from 'entities/user';

import type { FormInfoData } from '../components/form-info';
import { FormPassData } from '../components/form-pass';

const userController = new UserController();
const authApi = new AuthAPI();

class UserPageController {
  async changeUserInfo(data: FormInfoData) {
    store.set('isLoading', true);

    const userInfo = await userController.updateUser(this.formatUserInfoPayload(data));
    const responseState = Boolean(userInfo?.id);

    if (responseState) {
      store.set('user', userInfo);
    }
    store.set('isLoading', false);

    return responseState;
  }

  async changeUserPass(data: FormPassData) {
    store.set('isLoading', true);
    const result = await userController.updatePass(this.formatUserPassPayload(data));

    store.set('isLoading', false);
    return result;
  }

  async changeUserAvatar(data: FormData) {
    store.set('isLoading', true);
    const user = await userController.updateAvatar(data);

    if (user?.id) {
      store.set('user', user);
    }
    store.set('isLoading', false);

    return Boolean(user?.id);
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

  formatUserPassPayload(pass: FormPassData): UserPassPayload {
    const { passNew, passCurr } = pass;
    return {
      oldPassword: passCurr,
      newPassword: passNew,
    };
  }
}

export const userPageController = new UserPageController();
