import { Input, InputField, InputFile, InputProps } from 'ui';
import { Component } from 'core';

import type { ValidationState } from 'tools';
import { validators } from 'tools';

import type { FieldChildren, FieldProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Field extends Component<FieldChildren, FieldProps> {
  constructor({
    name,
    classes,
    validator = validators[name] || validators.isRequired,
    onBlur = () => this.handleValidation(),

    ...rest
  }: FieldProps) {
    super({
      classes,
      validator,

      input: new Input({ name, onBlur, ...rest }),
    } as FieldProps & FieldChildren);
  }

  handleValidation() {
    console.log('call handle validate');
    const { hasError, textError, value } = this.validate();
    this.setProps({ hasError });
    this.children.input.setProps({ hasError, value, textError });
  }

  validate(): ValidationState {
    console.log('call validate');
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
