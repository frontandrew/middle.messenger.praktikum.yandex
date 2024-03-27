import { Component } from 'core';
import { validators } from 'tools';

import type{ FieldArgs, FieldProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class Field extends Component<FieldProps> {
  private value: string;

  constructor(args: FieldArgs) {
    super({
      onChange: (event) => {
        this.validate();
        return event;
      },
      onInput: (event) => {
        this.setValue(event);
        return event;
      },

      disabled: false,
      hasError: false,
      required: false,
      textError: '',
      textHelp: '',
      touched: false,
      validator: validators[args.name],
      value: '',

      ...args,
    });

    this.value = this.props.value;
  }

  private setValue({ target }: InputEvent) {
    if (target instanceof HTMLInputElement) {
      this.value = target.value;
    }
  }

  validate() {
    const validationState = this.props.validator({
      required: this.props.required,
      value: this.value,
    });
    this.setProps({ ...validationState, value: this.value });
  }

  reset() {
    this.setProps({ hasError: false, touched: false, value: '' });
    this.value = this.props.value;
  }

  render() {
    return template;
  }
}
