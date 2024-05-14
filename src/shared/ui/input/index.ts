import { Component } from 'core';

import type { InputChildren, InputProps, InputType } from './type';

import template from './template.hbs?raw';
import './style.css';

export type { InputChildren, InputProps, InputType };

export class Input extends Component<InputChildren, InputProps> {
  public value: string;

  constructor({
    onInput = (event: InputEvent) => {
      this.setValue(event);
      return event;
    },
    ...rest
  }: InputProps) {
    super({ onInput, ...rest } as InputChildren & InputProps);

    this.value = this.props.value!;
  }

  protected setValue({ target }: InputEvent) {
    if (!(target instanceof HTMLInputElement)) return;

    if (target.files?.length) {
      this.value = target.files[0].name;
      return;
    }

    if (target.value || target.value === '') {
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
