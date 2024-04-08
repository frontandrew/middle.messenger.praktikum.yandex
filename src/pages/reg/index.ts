import { LayoutReg } from './components';

import type { FormRegData as PageRegContext } from './components/form-reg/type';

export class PageReg extends LayoutReg {
  constructor({
    email = '',
    login = '',
    firstName = '',
    secondName = '',
    phone = '',
    password = '',
    passwordMore = '',

    ...rest
  }: PageRegContext) {
    super({
      data: {
        email,
        login,
        firstName,
        secondName,
        phone,
        password,
        passwordMore,
      },

      ...rest,
    });
  }
}

export type { PageRegContext };
