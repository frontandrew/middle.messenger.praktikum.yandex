import { store } from 'store';

import { UserApi } from './api';

import type { UserProfilePayload, UserResponse, UserSearchPayload, UserType } from './type';

const userApi = new UserApi();

export class UserController {
  // async createUser() {
  //   return user;
  // }

  // async deleteUser() {
  //   return user;
  // }

  async getUser(): Promise<UserType | null> {
    const user = await userApi.getUserData()
      .then(({ response }) => this.formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);

    return user;
  }

  async updateUser(data: UserProfilePayload): Promise<UserType | null> {
    const user = await userApi.setUserData(data)
      .then(({ response }) => this.formatUserResponse(response))
      // .cathch(error) // TODO: catch error
      .catch(() => null);
    return user;
  }

  async searchUser(login: UserSearchPayload): Promise<UserType[]> {
    const users = await userApi.searchUserByLogin(login)
      .then(({ response }) => response.map(this.formatUserResponse))
      // .cathch(error) // TODO: catch error
      .catch(() => []);
    return users;
  }

  setUser(user: UserType | null) {
    store.set('user', user);
  }

  formatUserResponse(data: UserResponse): UserType {
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
