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
    label,
    type,
    classes = '',
    disabled = false,
    inline = false,
    hasError = false,
    textError = '',
    textHelp = '',
    required = false,
    validator = validators[name] || validators.isRequired,
    value = '',
  }: FieldArgs) {
    super({
      classes,
      disabled,
      hasError,
      inline,
      label,
      name,
      required,
      type,
      textError,
      textHelp,
      validator,
      value,
    });
  }

  createChildren(): void {
    const {
      name, type, classes = '', disabled, hasError, value,
    } = this.props;
    this.children = {
      input: new Input({
        name,
        type,
        classes,
        disabled,
        hasError,
        value,
        onBlur: () => this.handleValidation(),
      }),
    };
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
}
