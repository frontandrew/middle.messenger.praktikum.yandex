import { Component } from 'core';

import { InputArgs, InputProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Input extends Component<InputArgs, object, InputProps> {
  public value: string;

  constructor({
    classes = '',
    disabled = false,
    hasError = false,
    name = '!unnamed!',
    type = 'text',
    value = '',
    onBlur = () => {},
    onInput = (event: InputEvent) => {
      this.setValue(event);
      return event;
    },
  }: InputArgs) {
    super({
      classes,
      disabled,
      hasError,
      name,
      type,
      value,
      onInput,
      onBlur,
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
