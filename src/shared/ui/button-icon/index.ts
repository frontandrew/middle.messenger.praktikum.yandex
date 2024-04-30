import { Component } from 'core';
import { Menu } from 'images';

import { ButtonIconChildren, ButtonIconProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class ButtonIcon extends Component<ButtonIconChildren, ButtonIconProps> {
  constructor({ pic = Menu, type = 'button', variant = 'filled', ...rest }: ButtonIconProps) {
    super({ pic, type, variant, ...rest } as ButtonIconChildren & ButtonIconProps);
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
