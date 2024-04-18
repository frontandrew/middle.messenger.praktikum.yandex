import { Component } from 'core';

import type { InputChildren, InputProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export type { InputChildren, InputProps };

export class Input extends Component<InputChildren, InputProps> {
  public value: string;

  constructor({
    name,
    value = '',
    placeholder,

    onInput = (event: InputEvent) => {
      this.setValue(event);
      return event;
    },

    ...rest
  }: InputProps) {
    super({
      name,
      value,
      placeholder: placeholder || name,
      onInput,

      ...rest,
    } as InputProps);

    this.value = this.props.value!;
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
