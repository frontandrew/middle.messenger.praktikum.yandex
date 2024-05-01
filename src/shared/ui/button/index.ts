import { Component } from 'core';

import { ButtonChildren, ButtonProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Button extends Component<ButtonChildren, ButtonProps> {
  constructor({
    classes = '',
    disabled = false,
    type = 'button',
    variant = 'filled',

    onClick = (event: Event) => event,

    ...rest
  }: ButtonProps) {
    super({
      classes,
      disabled,
      type,
      variant,
      onClick,

      ...rest,
    } as ButtonChildren & ButtonProps);
  }

  setDisabled(state: boolean) {
    this.setProps({ disabled: state });
  }

  reset() {
    this.setProps({ disabled: false });
  }

  render() {
    return template;
  }
}
