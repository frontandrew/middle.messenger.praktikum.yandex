import { Component } from 'core';
import { Text } from 'ui';

import { FormAuth } from '../form-auth';

import type { LayoutAuthArgs, LayoutAuthChildren } from './type';
import template from './template.hbs?raw';
import './style.css';

export class LayoutAuth extends Component<LayoutAuthArgs, LayoutAuthChildren, object> {
  constructor({ data, ...rest }: LayoutAuthArgs) {
    super({
      title: new Text({
        classes: 'layout-auth__title',
        tag: 'h1',
        text: 'Authorization',
      }),
      form: new FormAuth({ data }),

      ...rest,
    });
  }

  render() {
    return template;
  }
}
