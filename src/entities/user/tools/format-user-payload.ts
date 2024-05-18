import { UserResponse, UserType } from '../type';

export function formatUserPayload(user: UserType): UserResponse {
  const { firstName, secondName, nickName, phone, ...rest } = user;
  return {
    first_name: firstName,
    second_name: secondName,
    display_name: nickName,
    phone: phone.split(' ').join(''),
    ...rest,
  };
}
