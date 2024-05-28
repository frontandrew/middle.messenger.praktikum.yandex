import { RESOURCES } from 'config';

import type { UserResponse } from 'apis/user';
import type { UserType } from 'entities/user';

export function formatUserResponse(data: UserResponse): UserType {
  /* eslint-disable camelcase */
  const { avatar, first_name, second_name, display_name, ...rest } = data;
  return {
    firstName: first_name,
    secondName: second_name,
    nickName: display_name,
    avatar: avatar ? RESOURCES + avatar : '',
    ...rest,
  };
}
