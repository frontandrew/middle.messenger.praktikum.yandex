import { Component } from 'core';
import { Text } from 'ui';

import { FormReg } from '../form-reg';

import type { LayoutRegArgs, LayoutRegChildren, LayoutRegProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class LayoutReg extends Component<LayoutRegArgs, LayoutRegChildren, LayoutRegProps> {
  constructor({ data, ...rest }: LayoutRegArgs) {
    super({
      title: new Text({
        classes: 'layout-reg__title',
        tag: 'h1',
        text: 'Registration',
      }),
      form: new FormReg({ data }),

      ...rest,
    });
  }

  render() {
    return template;
  }
}
