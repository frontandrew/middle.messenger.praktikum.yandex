import { Component } from 'core';

import type { Children } from 'core';

import { TextProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Text extends Component<Children, TextProps> {
  constructor({ classes = '', tag = 'span', ...rest }: TextProps) {
    super({ classes, tag, ...rest } as TextProps & Children);
  }

  render() {
    return template;
  }
}
