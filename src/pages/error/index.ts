import { Button, Text } from 'ui';
import { Layout } from './components';

import type { ErrorPageArgs } from './type';

export class PageError extends Layout {
  constructor(args: ErrorPageArgs) {
    super({
      title: new Text({
        tag: 'h1',
        text: args.title,
        class: 'error-page__title',
      }),
      message: new Text({
        tag: 'h2',
        text: args.message,
        class: 'error-page__message',
      }),
      redirect: new Button({
        label: args.redirectLabel,
        type: 'button',
        page: args.redirectTarget,
        variant: 'link',
      }),
    });
  }
}
