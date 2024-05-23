import { RESOURCES } from 'config';

import type { UserResponse, UserType } from '../type';

export function formatUserResponse(data: UserResponse): UserType {
  /* eslint-disable camelcase */
  const { avatar, first_name, second_name, display_name, ...rest } = data;
  return {
    firstName: first_name,
    secondName: second_name,
    nickName: display_name,
    avatar: RESOURCES + avatar,
    ...rest,
  };
}
