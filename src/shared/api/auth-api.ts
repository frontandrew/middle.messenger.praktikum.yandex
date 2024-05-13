import { HTTPTransport } from 'network';

const authTransport = new HTTPTransport();

interface AuthenticationPayload {
  login: string,
  password: string
}

interface AuthenticationResponse {
  status: number
}

export class AuthAPI {
  authentication(data: AuthenticationPayload) {
    return authTransport
      .post<AuthenticationPayload, AuthenticationResponse>('/auth/signin', { data });
  }

  authorization() {
    return authTransport.get('/auth/user');
  }

  logout() {
    return authTransport.get('auth/logout');
  }
}
