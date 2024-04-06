import { Component } from 'core';

import { ButtonArgs, ButtonProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Button extends Component<{}, ButtonProps> {
  constructor({
    classes = '',
    disabled = false,
    page = '',
    type = 'button',
    variant = 'filled',

    onClick = (event: Event) => event,

    ...rest
  }: ButtonArgs) {
    super({ classes, disabled, page, type, variant, onClick, ...rest });
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
