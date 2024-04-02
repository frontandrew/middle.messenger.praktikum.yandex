import { Component } from 'core';
import { DefPic } from 'images';

import type { AvatarArgs, AvatarProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Avatar extends Component<AvatarArgs, object, AvatarProps> {
  constructor(args: AvatarArgs) {
    const { size, def } = args;

    super({
      size: size ?? 'medium',
      def: def ?? DefPic,
    });
  }

  render() {
    return template;
  }
}
