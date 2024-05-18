import { Avatar } from 'ui';
import { Component } from 'core';
import { withStore } from 'store';

import type { ControlAvatarChildren, ControlAvatarProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const AvatarWithState = withStore(

  /* TODO: move resorce endpoit to constants */
  (state) => ({ pic: `https://ya-praktikum.tech/api/v2/resources${state.user?.image}` }),
)(Avatar);

export class ControlAvatar extends Component <ControlAvatarChildren, ControlAvatarProps> {
  constructor(props: ControlAvatarProps) {
    super({
      avatar: new AvatarWithState({ size: 'large' }),
      ...props,
    } as ControlAvatarChildren & ControlAvatarProps);
  }

  render() {
    return template;
  }
}
