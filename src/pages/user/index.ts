import { LayoutUser } from './components';

import type { PageUserArgs } from './type';

export class PageUser extends LayoutUser {
  constructor(args: PageUserArgs) {
    super({
      isEdit: true,
      ...args,
    });
  }
}
