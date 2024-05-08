import { Button, Text } from 'ui';
import { Component } from 'core';
import { withRouter } from 'routing';

import type { LayoutErrorChildren, LayoutErrorProps } from './type';

import template from './template.hbs?raw';
import './style.css';

const ComponentWithRouter = withRouter(Component);

export class LayoutError extends ComponentWithRouter<LayoutErrorChildren, LayoutErrorProps> {
  constructor({
    title = 'Error...',
    message = 'An unexpected error has occurred. Try restarting or come back later.',
  }: LayoutErrorProps) {
    super({
      title: new Text({
        tag: 'h1',
        text: title,
        classes: 'error-page__title',
      }),
      message: new Text({
        tag: 'h2',
        text: message,
        classes: 'error-page__message',
      }),
      redirect: new Button({
        label: `Return to chats page`,
        type: 'button',
        onClick: () => this.router.go('/messenger'),
        variant: 'link',
      }),
    } as LayoutErrorChildren & LayoutErrorProps);
  }

  render() {
    return template;
  }
}

export type { LayoutErrorChildren, LayoutErrorProps };
