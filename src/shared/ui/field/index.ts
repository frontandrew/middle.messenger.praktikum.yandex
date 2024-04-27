import { Input, InputField, InputFile } from 'ui';
import { Component } from 'core';

import type { ValidationState } from 'tools';
import { validators } from 'tools';

import type { FieldChildren, FieldProps } from './type';
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
    placeholder = '',
    textHelp = '',
    type = 'text',
    required = false,
    value = '',
    validator = validators[name] || validators.isRequired,

    input = type === 'simple'
      ? new Input({
        name,
        type: 'text',
        placeholder,
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
          label: label ?? 'Label',
          disabled,
          textHelp,
          hasError,
          value,
          inline,
          onBlur: () => this.handleValidation(),
        }),
  }: FieldProps) {
    super({
      classes,
      hasError,
      required,
      validator,

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
