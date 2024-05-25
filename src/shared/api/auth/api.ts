import { HTTPTransport } from 'network';

import type { UserResponse } from 'services/users';

import type { AuthPayload, AuthResponse, RegPayload, RegResponse } from './type';

export class AuthAPI {
  private api = new HTTPTransport();

  public login(payload: AuthPayload) {
    return this.api.post<AuthPayload, AuthResponse>('/auth/signin', { data: payload });
  }

  public logout() {
    return this.api.post<void, AuthResponse>('/auth/logout');
  }

  public getUserData() {
    return this.api.get<void, UserResponse>('/auth/user');
  }

  public registration(data: RegPayload) {
    return this.api.post<RegPayload, RegResponse>('/auth/signup', { data });
  }
}
