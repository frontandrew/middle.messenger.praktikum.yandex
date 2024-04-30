import { LayoutUser } from './components';

import type { LayoutUserArgs } from './components/layout-user/type';
import type { FormInfoData as PageUserContext } from './components/form-info/type';

export class PageUser extends LayoutUser {
  constructor({ image, ...rest }: PageUserContext) {
    super({ image, data: { ...rest } } as LayoutUserArgs);
  }
}

export type { PageUserContext };
