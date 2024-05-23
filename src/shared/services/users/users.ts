import { UserType } from 'entities/user';
import { UsersAPI } from 'api';
import { formatUserResponse } from './tools';

import type {
  UserPassPayload,
  UserProfilePayload,
  UserSearchPayload,
} from './type';

const userApi = new UsersAPI();

export class UsersController {
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

  async updateAvatar(data: FormData): Promise<UserType | null> {
    const user = await userApi.setUserAvatar(data)
      .then(({ response }) => formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);
    return user;
  }

  async searchUser(login: UserSearchPayload): Promise<UserType[]> {
    const users = await userApi.searchUserByLogin(login)
      .then(({ response }) => response.map(formatUserResponse))
      // .cathch(error) // TODO: catch error
      .catch(() => []);
    return users;
  }
}
