import { Component } from 'core';
import { Text } from 'ui';

import { FormReg } from '../form-reg';

import template from './template.hbs?raw';
import './style.css';

export class LayoutReg extends Component<{}, {}, {}> {
  constructor() {
    super({
      title: new Text({
        classes: 'layout-reg__title',
        tag: 'h1',
        text: 'Registration',
      }),
      form: new FormReg({}),
    });
  }

  render() {
    return template;
  }
}
