import { store } from 'store';
import { UserAPI } from 'apis/user';
import { router } from 'routing';

import type { ProfileUserType, RegUserType, UserType } from 'entities/user';
import type { UserPassPayload, UserSearchPayload } from 'apis/user';

import { formatUserProfilePayload, formatUserRegPayload, formatUserResponse } from './tools';

class UsersService {
  private api = new UserAPI();

  /* Method `getUser` do not trigger loading state! */
  async getUser(): Promise<void> {
    const user = await this.api.getUserData()
      .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);

    store.set('user', user);
    router.setAuthState(Boolean(user));
  }

  public async regUser(data: RegUserType) {
    store.set('isLoading', true);

    const isRegistered = await this.api
      .registration(formatUserRegPayload(data))
      .then(({ response }) => Boolean(response.id))
      // .cathch(error) // TODO: catch error
      .catch(() => false);
    if (isRegistered) router.go('/');

    store.set('isLoading', false);
  }

  async updateUser(data: ProfileUserType): Promise<boolean> {
    store.set('isLoading', true);

    const user = await this.api.setUserData(formatUserProfilePayload(data))
      .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);

    if (user?.id) store.set('user', user);
    store.set('isLoading', false);

    return Boolean(user);
  }

  async updatePass(data: UserPassPayload): Promise<boolean> {
    store.set('isLoading', true);

    const result = await this.api.setUserPass(data)
      .then(({ response }) => response === 'OK')
      // .cathch(error) // TODO: catch error
      .catch(() => false);

    store.set('isLoading', false);
    return result;
  }

  async updateAvatar(avatar: FormData): Promise<boolean> {
    if (!(avatar instanceof FormData)) return false;
    store.set('isLoading', true);

    const user = await this.api.setUserAvatar(avatar)
      .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);

    if (user?.avatar) store.set('user.avatar', user.avatar);
    store.set('isLoading', false);
    return Boolean(user?.avatar);
  }

  async searchUsers(login: UserSearchPayload): Promise<UserType[]> {
    store.set('isLoading', true);

    const users = await this.api.searchUserByLogin(login)
      .then(({ response }) => response.map(formatUserResponse))
      // .cathch(error) // TODO: catch error
      .catch(() => []);

    store.set('isLoading', false);
    return users;
  }
}

export const usersServ = new UsersService();
