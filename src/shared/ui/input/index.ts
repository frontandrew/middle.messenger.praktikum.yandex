import Handlebars from 'handlebars';

import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Input', template);

export class Input extends Component {
  constructor(props = {}) {
    super({
      onChange: (e) => this._setValue(e),
      onBlur: () => this._validate(),

      name: 'input',
      type: 'text',

      ...props,
    });
  }

  _setValue(e) {
    this.setProps({ value: e.target.value });
  }

  _validate() {
    const { value } = this.props;

    // использовать валидатор
    if (value === '1234') this.setProps({ error: true });
    else this.setProps({ error: false });
  }

  render() {
    return template;
  }
}
