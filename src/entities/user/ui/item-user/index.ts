import { Avatar, Text } from 'ui';
import { Component } from 'core';

import type { ItemUserChildren, ItemUserProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class ItemUser extends Component<ItemUserChildren, ItemUserProps> {
  constructor({ avatar, nickName, firstName, secondName, ...rest }: ItemUserProps) {
    super({
      avatarUser: new Avatar({ pic: avatar || '' }),
      nameUser: new Text({
        text: `${firstName ?? ''} ${secondName ?? ''}`,
        tag: 'h3',
        classes: 'text_title',
      }),
      nickUser: new Text({
        text: nickName || '',
        classes: 'text_label text_light-color',
      }),
      ...rest,
    } as ItemUserChildren & ItemUserProps);
  }

  toggleSelected() {
    this.setProps({ isSelected: !this.props.isSelected });
  }

  render() {
    return template;
  }
}
