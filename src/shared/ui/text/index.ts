import { Component } from 'core';

import { TextArgs, TextProps } from './type';
import template from './template.hbs?raw';
import './style.css';

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
