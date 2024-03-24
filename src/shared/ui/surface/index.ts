import Handlebars from 'handlebars';

import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Surface', template);

export class Surface extends Component {
  render() {
    return template;
  }
}
