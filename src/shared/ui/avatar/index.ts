import Handlebars from 'handlebars';

import { Component } from 'core';
import { DefaultPic } from 'images';

import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Avatar', template);

export class Avatar extends Component {
  constructor(args = {}) {
    super({
      defaultPic: DefaultPic,
      size: 'medium',

      ...args,
    });
  }

  render() {
    return template;
  }
}
