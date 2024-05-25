export interface UserResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export type UserProfilePayload = Omit<UserResponse, 'id' | 'avatar' | 'display_name'>

export interface UserSearchPayload {
  login: string;
}

export interface UserPassPayload {
  oldPassword: string;
  newPassword: string;
}

export type UserPassResponse = 'OK';

export interface UserRegPayload {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserRegResponse {
  id: number
}
