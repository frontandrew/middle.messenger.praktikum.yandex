import { HTTPTransport } from 'network';
import type{ UserResponse } from 'api/user';

import type { AuthPayload, AuthResponse, RegPayload, RegResponse } from './type';

export class AuthAPI {
  private http = new HTTPTransport();

  public login(payload: AuthPayload) {
    return this.http.post<AuthPayload, AuthResponse>('/auth/signin', { data: payload });
  }

  public logout() {
    return this.http.post<void, AuthResponse>('/auth/logout');
  }

  public getUserData() {
    return this.http.get<void, UserResponse>('/auth/user');
  }

  public registration(data: RegPayload) {
    return this.http.post<RegPayload, RegResponse>('/auth/signup', { data });
  }
}