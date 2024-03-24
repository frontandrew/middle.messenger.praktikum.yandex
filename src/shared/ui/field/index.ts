import Handlebars from 'handlebars';

import { Component } from 'core';
import { validators } from 'tools';

import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Field', template);

export class Field extends Component {
  constructor(props = {}) {
    super({
      onInput: (event) => {
        this._setValue(event);
        return event;
      },
      onChange: (event) => {
        this.validate();
        return event;
      },

      validator: validators[props.name],
      touched: false,
      hasError: false,
      textError: null,
      textHelp: null,
      required: false,
      disabled: false,

      ...props,
    });

    this._value = this.props.value;
  }

  _setValue({ target }) {
    this._value = target.value;
  }

  validate() {
    const validationState = this.props.validator({
      string: this._value,
      isRequred: this.props.required,
    });
    this.setProps({ ...validationState, value: this._value });
  }

  reset() {
    this.setProps({ value: '', hasError: false, touched: false });
    this._value = this.props.value;
  }

  render() {
    return template;
  }
}
