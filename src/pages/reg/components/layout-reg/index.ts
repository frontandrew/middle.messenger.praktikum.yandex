import { Component } from 'core';
import { Text } from 'ui';

import { FormReg } from '../form-reg';
import type { FormRegData } from '../form-reg';

import type { LayoutRegChildren, LayoutRegProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class LayoutReg extends Component<LayoutRegChildren, LayoutRegProps> {
  constructor(data: FormRegData) {
    super({
      title: new Text({
        classes: 'layout-reg__title',
        tag: 'h1',
        text: 'Registration',
      }),
      form: new FormReg(data),
    } as LayoutRegChildren & LayoutRegProps);
  }

  render() {
    return template;
  }
}
