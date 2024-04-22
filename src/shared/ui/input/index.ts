import { Component } from 'core';

import type { InputChildren, InputProps, InputType } from './type';

import template from './template.hbs?raw';
import './style.css';

export type { InputChildren, InputProps, InputType };

/**
 * Can used like base input componet in more complex inputs, or like independed
 * text input in cases without validation state
 */

export class Input<C extends InputChildren, P extends InputProps> extends Component<C, P> {
  public value: string;

  constructor({
    name,
    value = '',
    placeholder = '',

    onInput = (event: InputEvent) => {
      this.setValue(event);
      return event;
    },

    ...rest
  }: InputProps) {
    super({
      name,
      value,
      placeholder,
      onInput,

      ...rest,
    } as C & P);

    this.value = this.props.value!;
  }

  protected setValue({ target }: InputEvent) {
    if (target instanceof HTMLInputElement) {
      this.value = target.value;
    }
  }

  reset() {
    this.setProps({ value: '' });
  }

  render() {
    return template;
  }
}
