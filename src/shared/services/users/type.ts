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

export type UserProfilePayload = Omit<UserResponse, 'id' | 'avatar'>

export interface UserSearchPayload {
  login: string;
}

export interface UserPassPayload {
  oldPassword: string;
  newPassword: string;
}

export type UserPassResponse = 'OK';
