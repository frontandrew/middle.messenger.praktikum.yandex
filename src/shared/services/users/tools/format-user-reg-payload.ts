import { UserRegPayload } from 'apis/user/type';
import { RegUserType } from 'entities/user';

export function formatUserRegPayload(user: RegUserType): UserRegPayload {
  const { firstName, secondName, phone, ...rest } = user;
  return {
    first_name: firstName,
    second_name: secondName,
    phone: phone.split(' ').join(''),
    ...rest,
  };
}
