import { UsersAPI } from 'api';
import { identity } from 'tools';
import { store } from 'store';

import type { UserType } from 'entities/user';

import type { UserPassPayload, UserProfilePayload, UserSearchPayload } from './type';
import { formatUserResponse } from './tools';

const userApi = new UsersAPI();

class UsersController {
  async getUser(): Promise<UserType | null> {
    const user = await userApi.getUserData()
      .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);

    return user;
  }

  async updateUser(data: UserProfilePayload): Promise<UserType | null> {
    const user = await userApi.setUserData(data)
      .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);
    return user;
  }

  async updatePass(data: UserPassPayload): Promise<boolean> {
    const result = await userApi.setUserPass(data)
      .then(({ response }) => response === 'OK')
      // .cathch(error) // TODO: catch error
      .catch(() => false);
    return result;
  }

  async updateAvatar(data: PlainObject): Promise<boolean> {
    store.set('isLoading', true);

    if ('avatar' in data && data.avatar instanceof FormData) {
      const result = await userApi.setUserAvatar(data.avatar)
        .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
        .catch(() => null);
      const user = identity<UserType>(result);

      if (typeof user?.id === 'number') {
        store.set('user', user);
        store.set('isLoading', false);
        return true;
      }
    }
    store.set('isLoading', false);
    return false;
  }

  async searchUser(login: UserSearchPayload): Promise<UserType[]> {
    const users = await userApi.searchUserByLogin(login)
      .then(({ response }) => response.map(formatUserResponse))
      // .cathch(error) // TODO: catch error
      .catch(() => []);
    return users;
  }
}

export const usersController = new UsersController();
