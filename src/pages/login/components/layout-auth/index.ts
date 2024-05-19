import { Button, Text } from 'ui';
import { Component } from 'core';
import { withRouter } from 'routing';

import { FormAuth } from '../form-auth';

import type { LayoutAuthChildren, LayoutAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const ComponentWithRouter = withRouter(Component);

export class LayoutAuth extends ComponentWithRouter<LayoutAuthChildren, LayoutAuthProps> {
  constructor() {
    super({
      title: new Text({
        classes: 'layout-auth__title',
        tag: 'h1',
        text: 'Authorization',
      }),
      redirect: new Button({
        label: 'Sign up',
        variant: 'link',
        onClick: () => this.router.go('/sign-up'),
      }),
      form: new FormAuth(),
    } as LayoutAuthChildren & LayoutAuthProps);
  }

  render() {
    return template;
  }
}
