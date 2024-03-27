import { Component } from 'core';
import { Input } from 'ui';
import { validators } from 'tools';

import type { FieldArgs, FieldProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class Field extends Component<FieldProps> {
  constructor(args: FieldArgs) {
    super({
      // onChange: (event: InputEvent) => {
      //   this.validate();
      //   return event;
      // },
      // onInput: (event: InputEvent) => {
      //   this.setValue(event);
      //   return event;
      // },

      disabled: false,
      hasError: false,
      required: false,
      textError: '',
      textHelp: '',
      touched: false,
      validator: validators[args.name],
      value: '',

      input: new Input({
        class: 'field__input',
        name: args.name,
        type: args.type,
        disabled: args.disabled,
        hasError: args.hasError,
        required: args.required,
        value: args.value,
        validator: validators[args.name],
      }),

      ...args,
    });
  }

  // private setValue({ target }: InputEvent) {
  //   if (target instanceof HTMLInputElement) {
  //     this.value = target.value;
  //   }
  // }

  // validate() {
  //   const validationState = this.props.validator({
  //     required: this.props.required,
  //     value: this.value,
  //   });
  //   this.setProps(validationState);
  // }

  reset() {
    this.setProps({ hasError: false, touched: false, value: '' });
    // this.value = this.props.value;
  }

  render() {
    return template;
  }
}
