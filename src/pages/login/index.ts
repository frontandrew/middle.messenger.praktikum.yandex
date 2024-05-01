import { LayoutAuth } from './components';

import type { FormAuthData as PageLoginContext } from './components/form-auth/type';

const data = {
  login: 'And',
  password: '!Q1gsdgr',
};

export class PageLogin extends LayoutAuth {
  constructor() {
    super(data);
  }
}

export type { PageLoginContext };
