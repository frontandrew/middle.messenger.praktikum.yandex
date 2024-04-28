import { Component } from 'core';
import { Input } from 'ui';
import { validators } from 'tools';

import type { ValidationState } from 'tools';

import type { FieldChildren, FieldProps } from './type';
import field from './template-field.hbs?raw';
import file from './template-file.hbs?raw';
import simple from './template-simple.hbs?raw';
import './style.css';

export class Field extends Component<FieldChildren, FieldProps> {
  constructor({
    name,
    type,
    onBlur = () => this.handleValidation(),

    classes,
    inline,
    label,
    required,
    hasError = false,
    textError = '',
    textHelp,
    validator = validators[name] || validators.isRequired,

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
      validator,

      name,
      type,
      input: new Input({
        name,
        type,
        onBlur,
        ...rest,
      }),
    } as FieldProps & FieldChildren);
  }

  handleValidation() {
    const { hasError, textError, value } = this.validate();
    this.setProps({ hasError, textError });
    this.children.input.props.value = value;
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
