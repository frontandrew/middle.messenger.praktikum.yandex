import { RegUserType } from 'entities/user';
import { UserProfilePayload } from 'apis/user';

export function formatUserPayload(user: RegUserType): UserProfilePayload {
  const { firstName, secondName, phone, ...rest } = user;
  return {
    first_name: firstName,
    second_name: secondName,
    phone: phone.split(' ').join(''),
    ...rest,
  };
}
