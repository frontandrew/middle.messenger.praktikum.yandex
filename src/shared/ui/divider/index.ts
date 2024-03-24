import Handlebars from 'handlebars';

import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Divider', template);

export class Divider extends Component {
  render() {
    return template;
  }
}
