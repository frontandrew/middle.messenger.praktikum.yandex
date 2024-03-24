import Handlebars from 'handlebars';

import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Button', template);

export class Button extends Component {
  constructor(props = {}) {
    super({
      variant: 'filled',
      disabled: false,
      type: 'button',

      ...props,
    });
  }

  setDisabled(state) {
    this.setProps({ disabled: state });
  }

  reset() {
    this.setProps({ disabled: false });
  }

  render() {
    return template;
  }
}
