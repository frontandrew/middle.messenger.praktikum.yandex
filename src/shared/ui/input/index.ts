import Handlebars from 'handlebars';

import { Component } from 'core';

import type { ValidationState } from 'tools';
import { validators } from 'tools';

import { InputArgs, InputProps } from './type';
import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Input', template);

export class Input extends Component<InputProps> {
  private value: string;
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
      validator: validators[args.name],
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
    this.validationState = this.props.validator({
      required: this.props.required,
      value: this.value,
    });
    this.validity = this.validationState;
    this.setState({ hasError: this.validity.hasError, value: this.value });
  }

  get validity(): ValidationState {
    return this.validationState;
  }

  set validity(state: ValidationState) {
    this.validationState = state;
  }

  setState(state: InputState) {
    this.setProps(state);
  }

  resetState() {
    console.log('input reset')
    this.setState({ value: '', hasError: false, disabled: false });
  }

  render() {
    return template;
  }
}
