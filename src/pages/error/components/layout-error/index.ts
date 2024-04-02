import { Button, Text } from 'ui';
import { Component } from 'core';

import type { LayoutErrorArgs, LayoutErrorChildren, LayoutErrorProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class LayoutError extends Component<LayoutErrorArgs, LayoutErrorChildren, LayoutErrorProps> {
  constructor(args: LayoutErrorArgs) {
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

  render() {
    return template;
  }
}
