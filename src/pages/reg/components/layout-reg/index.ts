import { Button, Loader, Text } from 'ui';
import { Component } from 'core';
import { withRouter } from 'routing';
import { withStore } from 'store';

import { FormReg } from '../form-reg';

import type { LayoutRegChildren, LayoutRegProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const Layout = withStore((state) => ({ isLoading: state.isLoading }))(withRouter(Component));

export class LayoutReg extends Layout<LayoutRegChildren, LayoutRegProps> {
  constructor() {
    super({
      isLoading: false,
      title: new Text({
        classes: 'layout-reg__title',
        tag: 'h1',
        text: 'Registration',
      }),
      form: new FormReg(),
      redirect: new Button({
        label: 'Sign in',
        variant: 'link',
        onClick: () => this.router.go('/'),
      }),
      loader: new Loader(),
    } as LayoutRegChildren & LayoutRegProps);
  }

  render() {
    return template;
  }
}
