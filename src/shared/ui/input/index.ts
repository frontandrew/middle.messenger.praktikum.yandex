import { Component } from 'core';

import { InputArgs, InputProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Input extends Component<{}, InputProps> {
  public value: string;

  constructor({
    type = 'text',

    classes = '',
    disabled = false,
    hasError = false,
    value = '',

    onBlur = () => {},
    onInput = (event: InputEvent) => {
      this.setValue(event);
      return event;
    },

    ...rest
  }: InputArgs) {
    super({
      type,

      classes,
      disabled,
      hasError,
      value,

      onInput,
      onBlur,

      ...rest,
    });

    this.value = this.props.value ?? '';
  }

  private setValue({ target }: InputEvent) {
    if (target instanceof HTMLInputElement) {
      this.value = target.value;
    }
  }

  reset() {
    this.setProps({ hasError: false, value: '' });
  }

  render() {
    return template;
  }
}
