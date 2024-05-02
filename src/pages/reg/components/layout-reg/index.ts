import { Button, Text } from 'ui';
import { Component } from 'core';
import { withRouter } from 'routing';

import { FormReg } from '../form-reg';
import type { FormRegData } from '../form-reg';

import type { LayoutRegChildren, LayoutRegProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const ComponentWithRouter = withRouter(Component);

export class LayoutReg extends ComponentWithRouter<LayoutRegChildren, LayoutRegProps> {
  constructor(data: FormRegData) {
    super({
      title: new Text({
        classes: 'layout-reg__title',
        tag: 'h1',
        text: 'Registration',
      }),
      form: new FormReg(data),
      redirect: new Button({
        label: 'Sign in',
        variant: 'link',
        onClick: () => this.router.go('/login'),
      }),
    } as LayoutRegChildren & LayoutRegProps);
  }

  render() {
    return template;
  }
}
