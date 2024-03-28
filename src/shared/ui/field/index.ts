import { Component } from 'core';
import { Input } from 'ui';

import type { ValidationState } from 'tools';
import { validators } from 'tools';

import type { FieldArgs, FieldProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class Field extends Component<FieldProps> {
  constructor(args: FieldArgs) {
    super({
      hasError: false,
      textError: '',
      textHelp: '',

      input: new Input({
        class: 'field__input',
        name: args.name,
        type: args.type,
        disabled: args.disabled,
        hasError: args.hasError,
        required: args.required,
        value: args.value,
        validator: validators[args.name],

        onBlur: () => this.handleValidation(),
      }),

      ...args,
    });
  }

  handleValidation() {
    this.children.input.validate();
    const state: ValidationState = this.children.input.validity;
    this.setProps(state);
  }

  validate() {
    this.children.input.validate();
  }

  get fieldState(): ValidationState {
    return this.children.input.validity;
  }

  resetState() {
    this.setProps({ hasError: false });
    this.children.input.resetState();
  }

  render() {
    return template;
  }
}
