// import { Component } from 'core';
import { Input } from 'ui';

import type { InputFieldChildren, InputFieldProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { InputFieldChildren, InputFieldProps } from './type';

export class InputField extends Input<InputFieldChildren, InputFieldProps> {
  constructor({
    hasError = false,
    inline = false,
    label = 'Unnemad field',

    ...inputProps
  }: InputFieldProps) {
    super({
      hasError,
      inline,
      label,

      input: new Input(inputProps),

      ...inputProps,
    } as InputFieldProps & InputFieldChildren);
  }

  reset() {
    this.children.input.reset();
    this.setProps({ hasError: false });
  }

  render() {
    return template;
  }
}
