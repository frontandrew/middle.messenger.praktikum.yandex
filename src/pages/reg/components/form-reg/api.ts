import { HTTPTransport } from 'network';

const regTransport = new HTTPTransport();

export interface RegPayload {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface RegResponse {
  id: number
}

export class RegAPI {
  registration(data: RegPayload) {
    return regTransport.post<RegPayload, RegResponse>('/auth/signup', { data });
  }
}
