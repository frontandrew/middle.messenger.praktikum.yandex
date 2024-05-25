import { store } from 'store';
import { UserAPI } from 'apis/user';
import { router } from 'routing';

import type { UserPassPayload, UserProfilePayload, UserSearchPayload } from 'apis/user';
import type { RegUserType, UserType } from 'entities/user';

import { formatUserPayload, formatUserResponse } from './tools';

class UsersService {
  private api = new UserAPI();

  async getUser(): Promise<void> {
    store.set('isLoading', true);

    const result = await this.api.getUserData()
      .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);

    if (result?.id) {
      store.set('user', result);
    }
    store.set('isLoading', false);
  }

  public async regUser(data: RegUserType) {
    store.set('isLoading', true);

    const isRegistered = await this.api
      .registration(formatUserPayload(data))
      .then(({ response }) => Boolean(response.id))
      .catch(() => false);
    if (isRegistered) {
      router.go('/');
    }

    store.set('isLoading', false);
  }

  async updateUser(data: UserProfilePayload): Promise<UserType | null> {
    const user = await this.api.setUserData(data)
      .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);
    return user;
  }

  async updatePass(data: UserPassPayload): Promise<boolean> {
    const result = await this.api.setUserPass(data)
      .then(({ response }) => response === 'OK')
      // .cathch(error) // TODO: catch error
      .catch(() => false);
    return result;
  }

  async updateAvatar(data: PlainObject): Promise<boolean> {
    store.set('isLoading', true);

    if ('avatar' in data && data.avatar instanceof FormData) {
      const user = await this.api.setUserAvatar(data.avatar)
        .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
        .catch(() => null);

      if (user?.id) {
        store.set('user', user);
        store.set('isLoading', false);
        return true;
      }
    }
    store.set('isLoading', false);
    return false;
  }

  async searchUser(login: UserSearchPayload): Promise<UserType[]> {
    const users = await this.api.searchUserByLogin(login)
      .then(({ response }) => response.map(formatUserResponse))
      // .cathch(error) // TODO: catch error
      .catch(() => []);
    return users;
  }
}

export const usersServ = new UsersService();
