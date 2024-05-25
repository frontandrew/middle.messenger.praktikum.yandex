export interface AuthPayload {
  login: string;
  password: string;
}

export type AuthResponse = 'OK';

export interface RegPayload {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegResponse {
  id: number
}
