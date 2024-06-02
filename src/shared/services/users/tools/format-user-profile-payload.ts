import { UserProfilePayload } from 'apis/user/type';
import { ProfileUserType } from 'entities/user';

export function formatUserProfilePayload(user: ProfileUserType): UserProfilePayload {
  const { firstName, secondName, nickName, phone, ...rest } = user;
  return {
    first_name: firstName,
    second_name: secondName,
    display_name: nickName,
    phone: phone.split(' ').join(''),
    ...rest,
  };
}
