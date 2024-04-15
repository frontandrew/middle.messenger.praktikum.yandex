import { Component } from 'core';

import type { Children } from 'core';
import type { InputProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class Input extends Component<Children, InputProps> {
  public value: string;

  constructor({
    name,
    type = 'text',
    classes = '',
    disabled = false,
    hasError = false,
    value = '',
    placeholder,

    onBlur = () => {},
    onInput = (event: InputEvent) => {
      this.setValue(event);
      return event;
    },
  }: InputProps) {
    super({
      name,
      type,
      classes,
      disabled,
      hasError,
      value,
      placeholder: placeholder || name,

      onInput,
      onBlur,
    } as InputProps);

    this.value = this.props.value;
  }

  protected setValue({ target }: InputEvent) {
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
