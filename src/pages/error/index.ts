import { LayoutError } from './components';

import type { LayoutErrorProps as PageErrorContext } from './components/layout-error/type';

export class PageError extends LayoutError {
  constructor(data: PageErrorContext) {
    super({ ...data });
  }
}

export type { PageErrorContext };
