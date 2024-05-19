import { Avatar } from 'ui';
import { Component } from 'core';
import { withStore } from 'store';

import type { ControlAvatarChildren, ControlAvatarProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const AvatarWithState = withStore(
  (state) => ({ pic: state.user?.avatar }),
)(Avatar);

export class ControlAvatar extends Component <ControlAvatarChildren, ControlAvatarProps> {
  constructor(props: ControlAvatarProps) {
    super({
      avatar: new AvatarWithState({ size: 'large', pic: '' }),
      ...props,
    } as ControlAvatarChildren & ControlAvatarProps);
  }

  render() {
    return template;
  }
}
