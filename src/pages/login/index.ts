import { LayoutAuth } from './components';

import type { FormAuthData as PageLoginContext } from './components/form-auth/type';

export class PageLogin extends LayoutAuth {
  constructor({ login = '', password = '' }: PageLoginContext) {
    super({ data: { login, password } });
  }
}

export type { PageLoginContext };
