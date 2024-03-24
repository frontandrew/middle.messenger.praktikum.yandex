import Handlebars from 'handlebars';

import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('BaseLayout', template);

export class BaseLayout extends Component {
  render() {
    return template;
  }
}
