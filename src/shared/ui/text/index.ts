import Handlebars from 'handlebars';

import { Component } from 'core';

import { TextArgs, TextProps } from './type';
import template from './template.hbs?raw';
import './style.css';

Handlebars.registerPartial('Text', template);

export class Text extends Component<TextProps> {
  constructor(args: TextArgs) {
    super({
      tag: 'span',

      ...args,
    });
  }

  render() {
    return template;
  }
}
