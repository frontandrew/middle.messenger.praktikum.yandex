import { LayoutReg } from './components';

import type { LayoutRegArgs } from './components/layout-reg/type';
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
    } as LayoutRegArgs);
  }
}

export type { PageRegContext };
