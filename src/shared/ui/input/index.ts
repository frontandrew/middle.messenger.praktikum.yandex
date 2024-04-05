import { Component } from 'core';

import { InputArgs, InputProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Input extends Component<InputArgs, object, InputProps> {
  public value: string;

  constructor(args: InputArgs) {
    super({
      disabled: false,
      hasError: false,

      ...args,
      onInput: (event: InputEvent) => {
        this.setValue(event);
        return event;
      },
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
