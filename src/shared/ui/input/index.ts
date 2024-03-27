import Handlebars from 'handlebars';

import { Component } from 'core';
import { validators } from 'tools';

import { InputArgs, InputProps } from './type';
import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Input', template);

export class Input extends Component<InputProps> {
  private value: string;

  constructor(args: InputArgs) {
    super({
      // onChange: (event: InputEvent) => {
      //   this.setValue(event);
      //   return event;
      // },
      // onBlur: (event: InputEvent) => {
      //   this.validate();
      //   return event;
      // },
      onInput: (event: InputEvent) => {
        this.validate();
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
  }

  private setValue({ target }: InputEvent) {
    if (target instanceof HTMLInputElement) {
      this.value = target.value;
    }
  }

  validate() {
    const validationState = this.props.validator({
      required: this.props.required,
      value: this.value,
    });
    console.log('Valid State:', validationState, this.value);
    this.setProps({ hasError: validationState.hasError, value: this.value });
  }

  render() {
    return template;
  }
}
