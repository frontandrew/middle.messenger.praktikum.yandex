import { Component } from 'core';
import { Text } from 'ui';

import { FormAuth } from '../form-auth';

import template from './template.hbs?raw';
import './style.css';

export class LayoutAuth extends Component<object, object, object> {
  constructor() {
    super({
      title: new Text({
        class: 'layout-auth__title',
        tag: 'h1',
        text: 'Authorization',
      }),
      form: new FormAuth({}),
    });
  }

  render() {
    return template;
  }
}
