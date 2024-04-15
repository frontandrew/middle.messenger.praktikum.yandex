import { Component } from 'core';
import { DefPic } from 'images';

import type { AvatarArgs, AvatarChildren, AvatarProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Avatar extends Component<AvatarChildren, AvatarProps> {
  constructor({ classes = '', size = 'medium', stub = DefPic, ...rest }: AvatarArgs) {
    super({ classes, size, stub, ...rest } as AvatarProps & AvatarChildren);
  }

  render() {
    return template;
  }
}
