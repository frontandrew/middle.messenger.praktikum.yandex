import { Component } from 'core';

import { TextProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Text extends Component<TextProps, object, TextProps> {
  constructor({ classes = '', tag = 'span', ...rest }: TextProps) {
    super({ classes, tag, ...rest });
  }

  render() {
    return template;
  }
}
