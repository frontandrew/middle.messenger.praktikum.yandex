import { Component } from 'core';

import { ButtonProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Button extends Component<ButtonProps, object, ButtonProps> {
  constructor({
    classes = '',
    disabled = false,
    page = '',
    type = 'button',
    variant = 'filled',

    onClick = (event: Event) => event,

    ...rest
  }: ButtonProps) {
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
