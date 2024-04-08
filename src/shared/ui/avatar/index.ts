import { Component } from 'core';
import { DefPic } from 'images';

import type { AvatarProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Avatar extends Component<AvatarProps, object, AvatarProps> {
  constructor({ classes = '', size = 'medium', stub = DefPic, ...rest }: AvatarProps) {
    super({ classes, size, stub, ...rest });
  }

  render() {
    return template;
  }
}
