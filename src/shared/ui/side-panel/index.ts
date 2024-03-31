import Handlebars from 'handlebars';

import { Component } from 'core';

import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('SidePanel', template);

export class SidePanel extends Component<object> {
  render() {
    return template;
  }
}
