import { Avatar } from 'ui';
import { Component } from 'core';

import type { ControlAvatarArgs, ControlAvatarChildren, ControlAvatarProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class ControlAvatar
  extends Component <ControlAvatarArgs, ControlAvatarChildren, ControlAvatarProps> {
  constructor({ image, onClick, disabled }: ControlAvatarArgs) {
    super({
      disabled,
      onClick,
      avatar: new Avatar({
        pic: image,
        size: 'large',
      }),
    });
  }

  render(): string {
    return template;
  }
}
