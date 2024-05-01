import { LayoutReg } from './components';

import type { FormRegData as PageRegContext } from './components/form-reg/type';

const data = {
  email: 'some@email.com',
  login: 'devostator777',
  firstName: 'John',
  secondName: 'Doe',
  phone: '+66 45 955 12 12',
  password: 'Q!1qwert',
  passwordMore: 'Q!1qwert',
};

export class PageReg extends LayoutReg {
  constructor() {
    super(data);
  }
}

export type { PageRegContext };
