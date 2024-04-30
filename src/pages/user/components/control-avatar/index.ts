import { Avatar } from 'ui';
import { Component } from 'core';

import type { ControlAvatarChildren, ControlAvatarProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class ControlAvatar extends Component <ControlAvatarChildren, ControlAvatarProps> {
  constructor({ image, ...rest }: ControlAvatarProps) {
    super({
      avatar: new Avatar({
        pic: image,
        size: 'large',
      }),
      ...rest,
    } as ControlAvatarChildren & ControlAvatarProps);
  }

  render() {
    return template;
  }
}
