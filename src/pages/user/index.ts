import { LayoutUser } from './components';

import type { FormInfoData } from './components/form-info/type';

export class PageUser extends LayoutUser {
  constructor({
    image = '',
    email = '',
    login = '',
    firstName = '',
    secondName = '',
    nickName = '',
    phone = '',
  }: FormInfoData) {
    super({
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
