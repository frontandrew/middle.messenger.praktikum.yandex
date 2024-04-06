import { Component } from 'core';
import { Text } from 'ui';

import { FormAuth } from '../form-auth';

import type { LayoutAuthChildren, LayoutAuthProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class LayoutAuth extends Component<LayoutAuthChildren, LayoutAuthProps> {
  constructor() {
    super({
      title: new Text({
        classes: 'layout-auth__title',
        tag: 'h1',
        text: 'Authorization',
      }),
      form: new FormAuth({
        login: 'And',
        password: '!Q1gsdgr',
      }),
    });
  }

  render() {
    return template;
  }
}
