import { Avatar, Text } from 'ui';
import { Component } from 'core';
import { RESOURCES } from 'config';

import type { UserType } from 'entities/user/type';

import type { ItemUserChildren, ItemUserProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class ItemUser extends Component<ItemUserChildren, ItemUserProps> {
  constructor(user: UserType) {
    super({
      ...user,
      isSelected: false,
      avatarUser: new Avatar({ pic: user.avatar ? RESOURCES + user.avatar : '' }),
      nameUser: new Text({
        text: `${user.firstName} ${user.secondName}`,
        tag: 'h3',
        classes: '',
      }),
      nickName: new Text({
        text: user.nickName,
        classes: '',
      }),
    } as ItemUserChildren & ItemUserProps);
  }

  toggleSelected() {
    this.setProps({ isSelected: !this.props.isSelected });
  }

  render() {
    return template;
  }
}
