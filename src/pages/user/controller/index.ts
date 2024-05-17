import { UserController } from 'entities/user';
import { store } from 'store';

import type { UserProfilePayload } from 'entities/user';

import type { FormInfoData } from '../components';

const userController = new UserController();

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
