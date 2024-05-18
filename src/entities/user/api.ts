import { HTTPTransport } from 'network';

import type {
  UserPassPayload,
  UserPassResponse,
  UserProfilePayload,
  UserResponse,
  UserSearchPayload,
} from './type';

const userTransport = new HTTPTransport();

export class UserApi {
  public getUserData() {
    return userTransport.get<void, UserResponse>('/auth/user');
  }

  public setUserData(payload: UserProfilePayload) {
    return userTransport.put<UserProfilePayload, UserResponse>('/user/profile', { data: payload });
  }

  public setUserAvatar(payload: FormData) {
    return userTransport.put<FormData, UserResponse>('/user/profile/avatar', { data: payload });
  }

  public setUserPass(payload: UserPassPayload) {
    return userTransport.put<UserPassPayload, UserPassResponse>(
      '/user/password',
      { data: payload },
    );
  }

  public searchUserByLogin(payload: UserSearchPayload) {
    return userTransport.post<UserSearchPayload, UserResponse[]>('/user/search', { data: payload });
  }
}
