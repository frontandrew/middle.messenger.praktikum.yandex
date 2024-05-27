import { Component } from 'core';

import type { InputChildren, InputProps, InputType } from './type';

import template from './template.hbs?raw';
import './style.css';

export type { InputChildren, InputProps, InputType };

export class Input extends Component<InputChildren, InputProps> {
  constructor(props: InputProps) {
    super(props as InputChildren & InputProps);
  }

  reset() {
    this.setProps({ value: '' });
  }

  render() {
    return template;
  }
}
