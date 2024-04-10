import { Component } from 'core';
import { Input } from 'ui';

import type { ValidationState } from 'tools';
import { validators } from 'tools';

import type { FieldArgs, FieldChildren, FieldProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Field extends Component<FieldArgs, FieldChildren, FieldProps> {
  constructor({
    name,

    classes = '',
    disabled = false,
    inline = false,
    hasError = false,
    textError = '',
    textHelp = '',
    type = 'text',
    required = false,
    value = '',
    validator = validators[name] || validators.isRequired,

    input = new Input({
      name,
      type,
      classes: '',
      disabled,
      hasError,
      value,
      onBlur: () => this.handleValidation(),
    }),

    ...rest
  }: FieldArgs) {
    super({
      name,

      classes,
      disabled,
      hasError,
      inline,
      required,
      type,
      textError,
      textHelp,
      validator,
      value,

      input,

      ...rest,
    });
  }

  handleValidation() {
    const { hasError, textError, value } = this.validate();
    this.setProps({ hasError, textError, value });
    this.children.input.setProps({ hasError, value });
  }

  validate(): ValidationState {
    return this.props.validator!({
      required: this.props.required,
      value: this.children.input.value,
    });
  }

  reset() {
    this.setProps({ hasError: false, textError: '' });
    this.children.input.reset();
  }

  render() {
    return template;
  }

  setDisabledState(state: boolean) {
    this.setProps({ disabled: state });
    this.children.input.setProps({ disabled: state });
  }
}
