import { Input, InputField, InputFile } from 'ui';
import { Component } from 'core';

import type { ValidationState } from 'tools';
import { validators } from 'tools';

import type { FieldArgs, FieldChildren, FieldProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Field extends Component<FieldChildren, FieldProps> {
  constructor({
    name,
    label,

    classes = '',
    disabled = false,
    inline = false,
    hasError = false,
    // textError = '',
    textHelp = '',
    type = 'text',
    required = false,
    value = '',
    validator = validators[name] || validators.isRequired,

    input = type === 'simple'
      ? new Input({
        name,
        type: 'text',
        disabled,
        value,
      })
      : type === 'file'
        ? new InputFile({
          label,
          name,
          type,
          disabled,
          hasError,
          value,
        })
        : new InputField({
          name,
          type,
          label,
          disabled,
          textHelp,
          hasError,
          value,
          inline,
          onBlur: () => this.handleValidation(),
        }),
  }: FieldArgs) {
    super({
      // name,

      classes,
      // disabled,
      hasError,
      // inline,
      required,
      // type,
      // textError,
      // textHelp,
      validator,
      // value,

      input,
    } as FieldProps & FieldChildren);
  }

  handleValidation() {
    const { hasError, textError, value } = this.validate();
    this.setProps({ hasError });
    this.children.input.setProps({ hasError, value, textError });
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
