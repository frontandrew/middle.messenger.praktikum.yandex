import { LayoutAuth } from './components';

import type { FormAuthData as PageLoginContext } from './components/form-auth/type';

export class PageLogin extends LayoutAuth {
  constructor(data: PageLoginContext) {
    super({ ...data });
  }
}

export type { PageLoginContext };
