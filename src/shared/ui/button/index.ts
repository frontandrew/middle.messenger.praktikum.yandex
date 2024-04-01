import Handlebars from 'handlebars';

import { Component } from 'core';

import { ButtonArgs, ButtonProps } from './type';
import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Button', template);

export class Button extends Component<ButtonArgs, object, ButtonProps> {
  constructor(args: ButtonArgs) {
    super({
      variant: 'filled',
      disabled: false,
      type: 'button',

      ...args,
    });
  }

  setDisabled(state: boolean) {
    this.setProps({ disabled: state });
  }

  resetState() {
    this.setProps({ disabled: false });
  }

  render() {
    return template;
  }
}
