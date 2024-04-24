import { Clip } from 'images';
import { Component } from 'core';

import { ButtonAttachChildren, ButtonAttachProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class ButtonAttach extends Component<ButtonAttachChildren, ButtonAttachProps> {
  constructor({ pic = Clip, ...props }: ButtonAttachProps) {
    super({ pic, ...props } as ButtonAttachChildren & ButtonAttachProps);
  }

  render() {
    return template;
  }
}
