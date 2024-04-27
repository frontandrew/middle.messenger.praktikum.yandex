import { LayoutError } from './components';

import type { LayoutErrorData as PageErrorContext } from './components/layout-error/type';

export class PageError extends LayoutError {
  constructor({
    title = 'Error...',
    message = 'An unexpected error has occurred. Try restarting or come back later.',
    target = 'login',
  }: PageErrorContext) {
    super({ title, message, target });
  }
}

export type { PageErrorContext };
