import { Component } from 'core';

import type { ValidationState } from 'tools';
import { deepEqual, validators } from 'tools';

import { InputArgs, InputProps, InputState } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Input extends Component<InputArgs, object, InputProps> {
  public value: string;
  private validationState: ValidationState;

  constructor(args: InputArgs) {
    super({
      onBlur: () => this.handleBlur(),
      onInput: (event: InputEvent) => {
        this.setValue(event);
        return event;
      },

      disabled: false,
      hasError: false,
      required: false,
      validator: validators[args.name] ?? validators.isRequired,
      value: '',

      ...args,
    });

    this.value = this.props.value;
    this.validationState = { hasError: this.props.hasError, textError: '' };
  }

  private setValue({ target }: InputEvent) {
    if (target instanceof HTMLInputElement) {
      this.value = target.value;
    }
  }

  handleBlur() {
    if (this.value === this.props.value) return;
    this.validate();
  }

  validate() {
    const state = this.props.validator({
      required: this.props.required,
      value: this.value,
    });

    this.validity = state;
  }

  get validity(): ValidationState {
    return this.validationState;
  }

  set validity(state: ValidationState) {
    if (!deepEqual(this.validationState, state)) {
      this.validationState = state;
      this.setState({ hasError: this.validationState.hasError, value: this.value });
    }
  }

  setState(state: InputState) {
    this.setProps(state);
  }

  resetState() {
    this.value = '';
    this.validationState = { hasError: false, textError: '' };
    this.setState({ value: '', hasError: false, disabled: false });
  }

  render() {
    return template;
  }
}
