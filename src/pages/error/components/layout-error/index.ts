import { Button, Text } from 'ui';
import { Component } from 'core';

import type { LayoutErrorArgs, LayoutErrorChildren, LayoutErrorProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class LayoutError extends Component<LayoutErrorChildren, LayoutErrorProps> {
  constructor({ data }: LayoutErrorArgs) {
    super({
      title: new Text({
        tag: 'h1',
        text: data.title,
        classes: 'error-page__title',
      }),
      message: new Text({
        tag: 'h2',
        text: data.message,
        classes: 'error-page__message',
      }),
      redirect: new Button({
        label: `Return to ${data.target} page`,
        type: 'button',
        page: data?.target,
        variant: 'link',
      }),
    } as LayoutErrorChildren);
  }

  render() {
    return template;
  }
}
