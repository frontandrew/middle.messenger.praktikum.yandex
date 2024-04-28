import { Component } from 'core';

import type { InputChildren, InputProps, InputType } from './type';

import templateField from './template-field.hbs?raw';
import templateFile from './template-file.hbs?raw';
import templateSimple from './template-simple.hbs?raw';
import './style.css';

export type { InputChildren, InputProps, InputType };

/**
 * Can used like base input componet in more complex inputs, or like independed
 * text input in cases without validation state
 */

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

    if (target.value) {
      this.value = target.value;
    }
  }

  reset() {
    this.setProps({ value: '' });
  }

  render() {
    if (this.props.type === 'simple') return templateSimple;
    if (this.props.type === 'file') return templateFile;
    return templateField;
  }
}
