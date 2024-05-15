import { Button, Loader, Text } from 'ui';
import { Component } from 'core';
import { withRouter } from 'routing';
import { withStore } from 'store';

import { FormAuth } from '../form-auth';

import type { LayoutAuthChildren, LayoutAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const ComponentWithRouter = withStore(
  (state) => ({ isLoading: state.isLoading }),
)(withRouter(Component));

export class LayoutAuth extends ComponentWithRouter<LayoutAuthChildren, LayoutAuthProps> {
  constructor() {
    super({
      isLoading: false,
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
      form: new FormAuth(),
      loader: new Loader(),
    } as LayoutAuthChildren & LayoutAuthProps);
  }

  render() {
    return template;
  }
}
