import { Component } from 'core';
import { Input } from 'ui';
import { validators } from 'validation';

import type { ValidationState } from 'validation';

import type { FieldChildren, FieldProps } from './type';
import field from './template-field.hbs?raw';
import file from './template-file.hbs?raw';
import simple from './template-simple.hbs?raw';
import './style.css';

export class Field extends Component<FieldChildren, FieldProps> {
  constructor({
    name,
    type,

    onBlur = type === 'file'
      ? () => {}
      : () => this.handleValidation(),
    onChange = type !== 'file'
      ? () => {}
      : () => this.handleValidation(),

    classes,
    disabled,
    inline,
    label,
    required,
    hasError = false,
    textError = '',
    textHelp,
    value,

    ...rest
  }: FieldProps) {
    super({
      classes,
      hasError,
      inline,
      label,
      required,
      textError,
      textHelp,
      value,

      name,
      type,
      disabled,
      input: new Input({
        name,
        type,
        disabled,
        onBlur,
        onChange,
        value,
        ...rest,
      }),
    } as FieldProps & FieldChildren);
  }

  handleValidation() {
    const { hasError, textError, value } = this.validate();
    this.setProps({ hasError, textError, value });
    this.children.input.props.value = value;
  }

  validate(): ValidationState {
    const { name, required, hasError = false, textError = '' } = this.props;
    const { value } = this.children.input;

    if (validators[name]) {
      return validators[name]({ value, required });
    }
    if (required) {
      return validators.isRequired({ value, required });
    }
    return { value, hasError, textError };
  }

  reset() {
    this.setProps({ hasError: false, textError: '' });
    this.children.input.reset();
  }

  setDisabledState(state: boolean) {
    this.setProps({ disabled: state });
    this.children.input.setProps({ disabled: state });
  }

  render() {
    if (this.props.type === 'simple') return simple;
    if (this.props.type === 'file') return file;
    return field;
  }
}
