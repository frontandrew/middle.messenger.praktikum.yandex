import Handlebars from 'handlebars';

import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Text', template);

export class Text extends Component {
  constructor(props = {}) {
    super({ tag: 'span', text: 'Some text', ...props });
  }

  render() {
    return template;
  }
}
