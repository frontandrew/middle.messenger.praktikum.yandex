import { HTTPTransport } from 'network';

import type {
  UserPassPayload,
  UserPassResponse,
  UserProfilePayload,
  UserResponse,
  UserSearchPayload,
} from './type';

export class UsersAPI {
  private http = new HTTPTransport();

  public setUserData(payload: UserProfilePayload) {
    return this.http.put<UserProfilePayload, UserResponse>('/user/profile', { data: payload });
  }

  public setUserAvatar(payload: FormData) {
    return this.http.put<FormData, UserResponse>('/user/profile/avatar', { data: payload });
  }

  public setUserPass(payload: UserPassPayload) {
    return this.http.put<UserPassPayload, UserPassResponse>(
      '/user/password',
      { data: payload },
    );
  }

  public searchUserByLogin(payload: UserSearchPayload) {
    return this.http.post<UserSearchPayload, UserResponse[]>('/user/search', { data: payload });
  }
}
