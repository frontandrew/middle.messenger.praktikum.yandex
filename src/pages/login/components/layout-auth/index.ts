import { Button, Text } from 'ui';
import { Component } from 'core';
import type { Props } from 'core';
import { withRouter } from 'routing';

import { FormAuth } from '../form-auth';
import type { FormAuthData } from '../form-auth';

import type { LayoutAuthChildren } from './type';
import template from './template.hbs?raw';
import './style.css';

const ComponentWithRouter = withRouter(Component);

export class LayoutAuth extends ComponentWithRouter<LayoutAuthChildren, Props> {
  constructor(data: FormAuthData) {
    super({
      title: new Text({
        classes: 'layout-auth__title',
        tag: 'h1',
        text: 'Authorization',
      }),
      redirect: new Button({
        label: 'Sign up',
        variant: 'link',
        onClick: () => this.router.go('/sing-up'),
      }),
      form: new FormAuth(data),
    } as LayoutAuthChildren);
  }

  render() {
    return template;
  }
}
