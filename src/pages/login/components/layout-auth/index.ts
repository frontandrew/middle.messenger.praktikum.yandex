import { Component } from 'core';
import type { Props } from 'core';
import { Text } from 'ui';

import { FormAuth } from '../form-auth';
import type { FormAuthData } from '../form-auth';

import type { LayoutAuthChildren } from './type';
import template from './template.hbs?raw';
import './style.css';

export class LayoutAuth extends Component<LayoutAuthChildren, Props> {
  constructor(data: FormAuthData) {
    super({
      title: new Text({
        classes: 'layout-auth__title',
        tag: 'h1',
        text: 'Authorization',
      }),
      form: new FormAuth(data),
    } as LayoutAuthChildren);
  }

  render() {
    return template;
  }
}
