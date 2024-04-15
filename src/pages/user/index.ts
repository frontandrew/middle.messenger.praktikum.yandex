import { LayoutUser } from './components';

import type { LayoutUserArgs } from './components/layout-user/type';
import type { FormInfoData as PageUserContext } from './components/form-info/type';

export class PageUser extends LayoutUser {
  constructor({
    image = '',
    email = '',
    login = '',
    firstName = '',
    secondName = '',
    nickName = '',
    phone = '',
  }: PageUserContext) {
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
    } as LayoutUserArgs);
  }
}

export type { PageUserContext };
