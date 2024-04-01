import { Component } from 'core';
import { DefaultPic } from 'images';

import type { AvatarArgs, AvatarProps } from './tipe';
import template from './template.hbs?raw';
import './style.css';

export class Avatar extends Component<AvatarProps> {
  constructor(args: AvatarArgs) {
    super({
      defaultPic: DefaultPic,
      size: 'medium',

      ...args,
    });
  }

  render() {
    return template;
  }
}
