import { LayoutError } from './components';

import type { LayoutErrorProps as PageErrorContext } from './components/layout-error/type';

export class PageError extends LayoutError {
  constructor();
  constructor(data?: PageErrorContext) {
    if (data) {
      super({ ...data });
    }
  }
}

export type { PageErrorContext };
