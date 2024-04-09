import { LayoutUser } from './components';

import type { FormUserData } from './components/form-user/type';

export class PageUser extends LayoutUser {
  constructor({
    image = '',
    email = '',
    login = '',
    firstName = '',
    secondName = '',
    nickName = '',
    phone = '',
  }: FormUserData) {
    super({
      isEdit: false,
      image,
      data: {
        email,
        login,
        firstName,
        secondName,
        nickName,
        phone,
      },
    });
  }
}
