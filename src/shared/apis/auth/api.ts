import { HTTPTransport } from 'network';

import type { AuthPayload, AuthResponse } from './type';

export class AuthAPI {
  private http = new HTTPTransport();

  public login(payload: AuthPayload) {
    return this.http.post<AuthPayload, AuthResponse>('/auth/signin', { data: payload });
  }

  public logout() {
    return this.http.post<void, AuthResponse>('/auth/logout');
  }
}
