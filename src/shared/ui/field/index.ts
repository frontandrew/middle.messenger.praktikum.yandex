import { Component } from 'core';
import { deepEqual } from 'tools';
import { Input } from 'ui';
import { validators } from 'validation';

import type { ValidationState } from 'validation';

import type { FieldChildren, FieldProps } from './type';
import fieldTemplate from './template-field.hbs?raw';
import fileTemplate from './template-file.hbs?raw';
import simpleTemplate from './template-simple.hbs?raw';
import './style.css';

export class Field extends Component<FieldChildren, FieldProps> {
  public file: File | null = null;
  public value: string = '';

  constructor({
    name,
    type,

    onBlur = type === 'file'
      ? () => {}
      : () => this.handleValidation(),
    onChange = type !== 'file'
      ? () => {}
      : () => this.handleValidation(),
    onInput = (event: InputEvent) => {
      this.handleInput();
      return event;
    },

    classes,
    disabled,
    inline,
    label,
    required,
    hasError = false,
    textError = '',
    textHelp,
    value,
    file,

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
      file,

      name,
      type,
      disabled,
      input: new Input({
        name,
        type,
        disabled,
        onBlur,
        onChange,
        onInput,
        value,
        ...rest,
      }),
    } as FieldProps & FieldChildren);
    this.value = this.props.value ?? '';
    this.file = this.props.file ?? null;
  }

  componentDidUpdate(oldProps: FieldProps, newProps: FieldProps): boolean {
    const { value: newValue } = newProps;
    const { value: oldValue } = oldProps;

    if (newValue !== oldValue) {
      this.children.input.setProps({ value: newValue });
      this.value = newValue || '';
    }

    return deepEqual(oldProps, newProps);
  }

  handleInput() {
    const inputElement = this.children.input.getContent() as HTMLInputElement;

    if (this.props.type === 'file') {
      this.file = inputElement?.files?.[0] ?? null;
      this.value = this.file?.name ?? 'no_name.file';
      return;
    }

    this.value = inputElement?.value;
  }

  handleValidation() {
    const { hasError, textError, value } = this.validate();
    this.setProps({ hasError, textError, value });
  }

  validate(): ValidationState {
    const { name, required, hasError = false, textError = '' } = this.props;
    const { value } = this;

    if (validators[name] && value) {
      return validators[name]({ value, required });
    }
    if (required && value) {
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
    if (this.props.type === 'simple') return simpleTemplate;
    if (this.props.type === 'file') return fileTemplate;
    return fieldTemplate;
  }
}
