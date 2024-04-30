import { Clip } from 'images';
import { Component } from 'core';

import { ButtonAttachChildren, ButtonAttachProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class ButtonAttach extends Component<ButtonAttachChildren, ButtonAttachProps> {
  constructor(props: Pick<ButtonAttachProps, 'onClick'>) {
    super({ pic: Clip, ...props } as ButtonAttachChildren & ButtonAttachProps);
  }

  render() {
    return template;
  }
}
