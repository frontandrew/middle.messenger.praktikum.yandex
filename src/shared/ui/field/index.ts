import { Component } from 'core';
import { validators } from 'tools';

import type{ FieldProps } from './type';
import type { ValidatorParams } from 'tools';

import template from './template.hbs?raw';
import './style.css';

export class Field extends Component {
  private value: string | undefined;

  constructor(props: FieldProps) {
    super({
      onChange: (event: InputEvent) => {
        this.validate();
        return event;
      },
      onInput: (event: InputEvent) => {
        this.setValue(event);
        return event;
      },

      disabled: false,
      hasError: false,
      required: false,
      textError: null,
      textHelp: null,
      touched: false,
      validator: validators[props.name],

      ...props,
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
