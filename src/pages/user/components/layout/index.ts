import { Component } from 'core';
import type { Props } from 'core';

import template from './template.hbs?raw';
import './style.css';

export class Layout extends Component<Props> {
  render() {
    return template;
  }
}