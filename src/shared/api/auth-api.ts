import { HTTPTransport } from 'network';

const authTransport = new HTTPTransport();

interface AuthenticationPayload {
  login: string;
  password: string;
}

type AuthenticationResponse = 'OK';

export class AuthAPI {
  login(payload: AuthenticationPayload) {
    return authTransport
      .post<AuthenticationPayload, AuthenticationResponse>('/auth/signin', { data: payload });
  }

  logout() {
    return authTransport.post<void, AuthenticationResponse>('/auth/logout');
  }
}
